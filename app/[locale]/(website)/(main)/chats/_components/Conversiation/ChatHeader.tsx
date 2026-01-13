import Image from "next/image";
import { Video, Phone, MoreVertical } from "lucide-react";
import { ChatInfo } from "@/types/chat";

export function ChatHeader({
  chatInfo,
  statusText,
}: {
  chatInfo: ChatInfo;
  statusText: string;
}) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <Image
              src={chatInfo.avatar}
              height={40}
              width={40}
              alt={chatInfo.name}
              className="rounded-full"
            />
          </div>
          {chatInfo.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">{chatInfo.name}</h2>
          <p className="text-xs text-green-500">{statusText}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Video className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Phone className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
