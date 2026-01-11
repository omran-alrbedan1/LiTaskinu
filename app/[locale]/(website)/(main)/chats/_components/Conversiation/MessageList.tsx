import { RefObject } from "react";
import { Message } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";

export function MessageList({
  messages,
  todayText,
  ariaSentImage,
  endRef,
}: {
  messages: Message[];
  todayText: string;
  ariaSentImage: string;
  endRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-4">
      <div className="text-center">
        <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
          {todayText}
        </span>
      </div>

      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} ariaSentImage={ariaSentImage} />
      ))}

      <div ref={endRef} />
    </div>
  );
}
