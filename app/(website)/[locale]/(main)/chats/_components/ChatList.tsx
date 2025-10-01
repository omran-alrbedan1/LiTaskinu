"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";
import { images } from "@/constants/images";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  image?: string;
  unread: number;
  avatar: string;
  online: boolean;
}

// Mock data matching your design
const mockChats: Chat[] = [
  {
    id: "1",
    name: "Alex Linderson",
    image: "/images/userTest.jpg",
    lastMessage: "How are you today?",
    timestamp: "2 min ago",
    unread: 3,
    avatar: "AL",
    online: true,
  },
  {
    id: "2",
    name: "Team Align",
    lastMessage: "Don't miss to attend the meeting.",
    timestamp: "2 min ago",
    unread: 1,
    avatar: "TA",
    online: true,
  },
  {
    id: "3",
    name: "John Ahraham",
    image: "/images/userTest.jpg",

    lastMessage: "Hey! Can you join the meeting?",
    timestamp: "2 min ago",
    unread: 0,
    avatar: "JA",
    online: false,
  },
  {
    id: "4",
    name: "John Borino",
    lastMessage: "Have a good day 🌸",
    timestamp: "2 min ago",
    unread: 0,
    avatar: "JB",
    online: true,
  },
  {
    id: "5",
    name: "Angel Dayna",
    image: "/images/userTest.jpg",

    lastMessage: "How are you today?",
    timestamp: "2 min ago",
    unread: 0,
    avatar: "AD",
    online: false,
  },
  {
    id: "6",
    name: "Eben Hunt",
    lastMessage: "Let's discuss the project",
    timestamp: "5 min ago",
    unread: 0,
    avatar: "EH",
    online: true,
  },
  {
    id: "7",
    name: "Team Updates",
    lastMessage: "New features deployed",
    timestamp: "1 hour ago",
    unread: 2,
    avatar: "TU",
    online: true,
  },
];

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setChats(mockChats);
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full hide-scrollbar">
      {/* Search */}
      <div className="p-4 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color1"
          />
        </div>
      </div>

      {/* Conversation count */}
      <div className="px-4 pb-3 flex-shrink-0">
        <p className="text-rose-400 text-sm font-medium">
          {chats.length} conversations
        </p>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {filteredChats.map((chat) => {
          const isActive = pathname === `/chats/${chat.id}`;

          return (
            <Link
              key={chat.id}
              href={`/en/chats/${chat.id}`}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 ${
                isActive ? "bg-red-300" : ""
              }`}
            >
              <div className="relative">
                <Image
                  src={chat.image || images.Unknown}
                  height={44}
                  width={44}
                  className="rounded-full"
                  alt={chat.name}
                />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {chat.unread}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
