import { useCallback, useEffect, useRef, useState } from "react";
// import { pusherClient } from "../utils/pusher";

const getInfoChat = "/api/chat?type=my-info";
const startConversationUrl = "/api/chat?type=start";
const getMessagesUrl = "/api/chat?type=messages"; // + &conversationId=ID
const sendMessagesUrl = "/api/chat?type=send";
const getConversationsUrl = "/api/chat?type=conversations";

type UseChatArgs = {
  receiverId?: string | number | null;
};

async function readError(res: Response) {
  try {
    const data = await res.json();
    return data?.error || data?.message || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

async function fetchJson<T = any>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    credentials: "include", // keep cookies/session
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as T;
}

export default function useChat({ receiverId }: UseChatArgs = {}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState<string | number | null>(null);
  const [initiatorId, setInitiatorId] = useState<string | number | null>(null);

  const [conversations, setConversations] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isConversationsLoading, setIsConversationsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const channelRef = useRef<any>(null);

  const unsubscribe = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.unbind_all();
      channelRef.current.unsubscribe();
      channelRef.current = null;
    }
  }, []);

  const fetchMessages = useCallback(async (convId: string | number) => {
    const data = await fetchJson<any>(`${getMessagesUrl}&conversationId=${convId}`, {
      method: "GET",
    });

    setMessages(Array.isArray(data) ? data : data?.data ?? []);
  }, []);

  const subscribeToConversation = useCallback(
      (convId: string | number) => {
        unsubscribe();

        const channelName = `private-conversation.${convId}`;
        // const channel = pusherClient.subscribe(channelName);
        // channelRef.current = channel;

        // channel.bind("new-message", () => {
        //   fetchMessages(convId).catch(() => {});
        // });
      },
      [fetchMessages, unsubscribe]
  );

  const fetchMessagesAndSubscribe = useCallback(
      async (convId: string | number) => {
        setIsLoading(true);
        setError(null);
        try {
          await fetchMessages(convId);
          subscribeToConversation(convId);
        } catch (e: any) {
          setError(e?.message ?? "Failed to load messages");
          console.error("Failed to fetch messages or subscribe:", e);
        } finally {
          setIsLoading(false);
        }
      },
      [fetchMessages, subscribeToConversation]
  );

  useEffect(() => {
    const startConversation = async () => {
      if (!receiverId) return;

      setIsLoading(true);
      setError(null);

      try {
        const conversation = await fetchJson<any>(startConversationUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ receiver_id: receiverId }),
        });

        const id = conversation?.id ?? null;
        setConversationId(id);
        setInitiatorId(conversation?.initiator_id ?? null);

        if (id) await fetchMessagesAndSubscribe(id);
      } catch (e: any) {
        setError(e?.message ?? "Failed to start conversation");
        console.error("Failed to start conversation:", e);
      } finally {
        setIsLoading(false);
      }
    };

    startConversation();
    return () => unsubscribe();
  }, [receiverId, fetchMessagesAndSubscribe, unsubscribe]);

  useEffect(() => {
    return () => unsubscribe();
  }, [unsubscribe]);

  const handleSend = useCallback(async () => {
    if (!newMessage.trim() || !conversationId) return;

    setIsSending(true);
    setError(null);

    const optimistic = {
      id: `tmp-${Date.now()}`,
      message: newMessage.trim(),
      message_type: "text",
      pending: true,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimistic]);
    setNewMessage("");

    try {
      await fetchJson(sendMessagesUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: optimistic.message,
          message_type: "text",
        }),
      });

      await fetchMessages(conversationId);
    } catch (e: any) {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setNewMessage(optimistic.message);
      setError(e?.message ?? "Failed to send message");
      console.error("Failed to send message:", e);
    } finally {
      setIsSending(false);
    }
  }, [conversationId, fetchMessages, newMessage]);

  const handleFileSend = useCallback(
      async (file: File) => {
        if (!conversationId || !file) return;

        setIsSending(true);
        setError(null);

        const formData = new FormData();
        formData.append("conversation_id", String(conversationId));
        formData.append("message_type", file.type.startsWith("image/") ? "photo" : "file");
        formData.append("file", file);

        try {
          const res = await fetch(sendMessagesUrl, {
            method: "POST",
            credentials: "include",
            body: formData, // don't set content-type
          });

          if (!res.ok) throw new Error(await readError(res));
          await fetchMessages(conversationId);
        } catch (e: any) {
          setError(e?.message ?? "Failed to send file");
          console.error("Failed to send file:", e);
        } finally {
          setIsSending(false);
        }
      },
      [conversationId, fetchMessages]
  );

  const handleAudioSend = useCallback(
      async (audioBlob: Blob) => {
        if (!conversationId || !audioBlob) return;

        setIsSending(true);
        setError(null);

        const formData = new FormData();
        formData.append("conversation_id", String(conversationId));
        formData.append("message_type", "audio");
        formData.append("file", audioBlob, "voice-message.webm");

        try {
          const res = await fetch(sendMessagesUrl, {
            method: "POST",
            credentials: "include",
            body: formData,
          });

          if (!res.ok) throw new Error(await readError(res));
          await fetchMessages(conversationId);
        } catch (e: any) {
          setError(e?.message ?? "Failed to send audio");
          console.error("Failed to send audio:", e);
        } finally {
          setIsSending(false);
        }
      },
      [conversationId, fetchMessages]
  );

  const getConversations = useCallback(async () => {
    setIsConversationsLoading(true);
    setError(null);

    try {
      const data = await fetchJson<any>(getConversationsUrl, { method: "GET" });
      const list = Array.isArray(data) ? data : data?.data ?? [];
      setConversations(list);
      return list;
    } catch (e: any) {
      setError(e?.message ?? "Failed to load conversations");
      console.error("Failed to get conversations:", e);
      return [];
    } finally {
      setIsConversationsLoading(false);
    }
  }, []);

  return {
    initiatorId,
    conversationId,
    setConversationId,

    messages,
    newMessage,
    setNewMessage,

    fetchMessagesAndSubscribe,
    handleSend,
    handleFileSend,
    handleAudioSend,
    getConversations,

    conversations,

    isLoading,
    isSending,
    isConversationsLoading,
    error,

    unsubscribe,
  };
}
