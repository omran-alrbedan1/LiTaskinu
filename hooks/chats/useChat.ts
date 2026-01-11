import { api } from "@/lib/apiClient";
import { useCallback, useEffect, useRef, useState } from "react";
// import { pusherClient } from "../utils/pusher";
const getInfoChat = "/children/chat/get-my-info";
const startConversationUrl = "/children/chat/start-conversation";
const getMessagesUrl = "/children/chat/messages";
const sendMessagesUrl = "/children/chat/send-message";
const getConversationsUrl = "/children/chat/get-conversations";

type UseChatArgs = {
  receiverId?: string | number | null;
};

export default function useChat({ receiverId }: UseChatArgs = {}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState<string | number | null>(
    null
  );
  const [initiatorId, setInitiatorId] = useState<string | number | null>(null);

  const [conversations, setConversations] = useState<any[]>([]);

  // ✅ Loading + error states
  const [isLoading, setIsLoading] = useState(false); // startConversation + fetch messages
  const [isConversationsLoading, setIsConversationsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Keep channel in a ref (no rerender problems)
  const channelRef = useRef<any>(null);

  const unsubscribe = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.unbind_all();
      channelRef.current.unsubscribe();
      channelRef.current = null;
    }
  }, []);

  const fetchMessages = useCallback(async (convId: string | number) => {
    const { data } = await api.get(`${getMessagesUrl}/${convId}`);
    // adjust mapping if your API returns { data: { data: [] } } etc.
    setMessages(Array.isArray(data) ? data : data?.data ?? []);
  }, []);

  const subscribeToConversation = useCallback(
    (convId: string | number) => {
      unsubscribe();

      const channelName = `private-conversation.${convId}`;
      // const channel = pusherClient.subscribe(channelName);
      // channelRef.current = channel;

      // // ✅ only ONE bind (no nested bind)
      // channel.bind("new-message", () => {
      //   fetchMessages(convId).catch(() => {
      //     // silent; keep UI stable
      //   });
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

  // ✅ Start / load conversation when receiverId changes
  useEffect(() => {
    const startConversation = async () => {
      if (!receiverId) return;

      setIsLoading(true);
      setError(null);

      try {
        const res = await api.post(startConversationUrl, {
          receiver_id: receiverId,
        });

        // adjust if your API differs
        const conversation = res?.data?.data ?? res?.data;

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
    // cleanup if receiver changes or unmount
    return () => unsubscribe();
  }, [receiverId, fetchMessagesAndSubscribe, unsubscribe]);

  // ✅ On unmount cleanup
  useEffect(() => {
    return () => unsubscribe();
  }, [unsubscribe]);

  const handleSend = useCallback(async () => {
    if (!newMessage.trim() || !conversationId) return;

    setIsSending(true);
    setError(null);

    // Optional: optimistic UI
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
      await api.post(sendMessagesUrl, {
        conversation_id: conversationId,
        message: optimistic.message,
        message_type: "text",
      });

      // After send, refresh to replace optimistic with real one (safer)
      await fetchMessages(conversationId);
    } catch (e: any) {
      // remove optimistic on error
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
      formData.append(
        "message_type",
        file.type.startsWith("image/") ? "photo" : "file"
      );
      formData.append("file", file);

      try {
        await api.post(sendMessagesUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
        await api.post(sendMessagesUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
      const { data } = await api.get(getConversationsUrl);
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
    // ids
    initiatorId,
    conversationId,
    setConversationId,

    // messages
    messages,
    newMessage,
    setNewMessage,

    // actions
    fetchMessagesAndSubscribe,
    handleSend,
    handleFileSend,
    handleAudioSend,
    getConversations,

    // conversations list
    conversations,

    // ui states
    isLoading,
    isSending,
    isConversationsLoading,
    error,

    // optional helpers
    unsubscribe,
  };
}
