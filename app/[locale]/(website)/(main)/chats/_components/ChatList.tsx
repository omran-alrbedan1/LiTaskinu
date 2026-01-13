"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { ChatListLoader } from ".";
import useChat from "@/hooks/chats/useChat";
import { ChatListItem, ChatListItemModel } from "./ChatLits/ChatListItem";
import { ChatSearchInput } from "./ChatLits/ChatSearchInput";


// ✅ Keep mock data separate (later you can delete it)
const mockChats: ChatListItemModel[] = [
  { id: "1", name: "Alex Linderson", image: "/images/userTest.jpg", lastMessage: "How are you today?", timestamp: "2 min ago", unread: 3, online: true },
  { id: "2", name: "Team Align", lastMessage: "Don't miss to attend the meeting.", timestamp: "2 min ago", unread: 1, online: true },
  { id: "3", name: "John Ahraham", image: "/images/userTest.jpg", lastMessage: "Hey! Can you join the meeting?", timestamp: "2 min ago", unread: 0, online: false },
  { id: "4", name: "John Borino", lastMessage: "Have a good day 🌸", timestamp: "2 min ago", unread: 0, online: true },
  { id: "5", name: "Angel Dayna", image: "/images/userTest.jpg", lastMessage: "How are you today?", timestamp: "2 min ago", unread: 0, online: false },
  { id: "6", name: "Eben Hunt", lastMessage: "Let's discuss the project", timestamp: "5 min ago", unread: 0, online: true },
  { id: "7", name: "Team Updates", lastMessage: "New features deployed", timestamp: "1 hour ago", unread: 2, online: true },
];

export default function ChatList({
  localePrefix = "/en",
  dataSource = "mock",
}: {
  localePrefix?: string; // so component can be reused with different locales
  dataSource?: "mock" | "api";
}) {
  const t = useTranslations("chats");
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Single hook usage
  const { conversations, getConversations, isLoading } = useChat();

  // ✅ Load conversations only if using API
  useEffect(() => {
    getConversations();
  }, []);

  // ✅ Choose source (mock vs API)
  const chats: ChatListItemModel[] = useMemo(() => {
    if (dataSource === "api") {
      // Map your API shape -> UI shape here
      // return conversations.map(...)
      return (conversations as unknown as ChatListItemModel[]) ?? [];
    }
    return mockChats;
  }, [dataSource, conversations]);

  // ✅ Filter
  const filteredChats = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return chats;

    return chats.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
      );
    });
  }, [chats, searchTerm]);

  if (dataSource === "api" && isLoading) {
    return <ChatListLoader />;
  }

  return (
    <div className="flex flex-col h-full hide-scrollbar">
      <ChatSearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={t("search_placeholder")}
      />

      <div className="px-4 pb-3 flex-shrink-0">
        <p className="text-rose-400 text-sm font-medium">
          {filteredChats.length} {t("conversations")}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {filteredChats.map((chat) => {
          const href = `${localePrefix}/chats/${chat.id}`;
          const isActive = pathname === href;

          return (
            <ChatListItem
              key={chat.id}
              chat={chat}
              href={href}
              isActive={isActive}
            />
          );
        })}
      </div>
    </div>
  );
}
