"use client";

import Link from "next/link";
import Image from "next/image";
import { images } from "@/constants/images";

export interface ChatListItemModel {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    image?: string;
    unread: number;
    online: boolean;
}

export function ChatListItem({
    chat,
    href,
    isActive,
    onClick,
}: {
    chat: ChatListItemModel;
    href: string;
    isActive: boolean;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 ${isActive ? "bg-red-300" : ""
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
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </div>

            {chat.unread > 0 && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {chat.unread}
                </div>
            )}
        </Link>
    );
}
