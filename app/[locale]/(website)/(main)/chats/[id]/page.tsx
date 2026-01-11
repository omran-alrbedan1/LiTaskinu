"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Message } from "@/types/chat";
import { useImageAttachments } from "@/hooks/chats/useImageAttachments";
import { getChatInfo, mockMessagesByChatId } from "@/constants/chat-mock";
import { useAutoScroll } from "@/hooks/chats/useAutoScroll";
import { ChatHeader } from "../_components/Conversiation/ChatHeader";
import { MessageList } from "../_components/Conversiation/MessageList";
import { ImagePreviewTray } from "../_components/Conversiation/ImagePreviewTray";
import { ChatComposer } from "../_components/Conversiation/ChatComposer";

export default function ChatPage() {
  const t = useTranslations("chats");
  const params = useParams();
  const chatId = params.id as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const attachments = useImageAttachments();
  const chatInfo = useMemo(() => getChatInfo(chatId), [chatId]);

  // load chat
  useEffect(() => {
    setMessages(mockMessagesByChatId[chatId] ?? []);
  }, [chatId]);

  // autoscroll
  useAutoScroll([messages], endRef, 120);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const hasText = Boolean(newMessage.trim());
    const hasImages = attachments.previews.length > 0;

    if (!hasText && !hasImages) return;

    const msg: Message = {
      id: Date.now().toString(),
      sender: "user",
      timestamp: new Date(),
      ...(hasText ? { text: newMessage.trim() } : {}),
      ...(hasImages ? { content: "images", images: attachments.previews } : {}),
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
    attachments.clear();

    // Simulate reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "other",
        timestamp: new Date(),
        text: hasImages
          ? "Great! Thanks for sharing the images! 🎉"
          : "Thanks for your message! I'll get back to you soon. 👍",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full hide">
      <ChatHeader
        chatInfo={chatInfo}
        statusText={chatInfo.online ? t("status.online") : t("status.offline")}
      />

      <MessageList
        messages={messages}
        todayText={t("status.today")}
        ariaSentImage={t("aria.sentImage")}
        endRef={endRef}
      />

      <ImagePreviewTray
        previews={attachments.previews}
        onRemove={attachments.removeAt}
        ariaPreviewPrefix={t("aria.preview")}
      />

      <ChatComposer
        value={newMessage}
        onChange={setNewMessage}
        onSend={handleSendMessage}
        disabled={!newMessage.trim() && attachments.previews.length === 0}
        fileInputRef={fileInputRef}
        onPickFiles={attachments.addFiles}
        tPlaceholder={t("input.placeholder")}
        emojiPickerRef={emojiPickerRef}
      />
    </div>
  );
}
