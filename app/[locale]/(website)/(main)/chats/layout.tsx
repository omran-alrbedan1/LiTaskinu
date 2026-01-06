import { ReactNode } from "react";
import ChatList from "./_components/ChatList";

interface ChatLayoutProps {
  children: ReactNode;
  chatlist: ReactNode;
}

export default function ChatLayout({ children, chatlist }: ChatLayoutProps) {
  return (
    <div className="flex   my-auto h-screen -mb-32 rounded-lg mx-4 overflow-hidden">
      {/* Chat List Sidebar */}
      <div className="w-80 bg-white border-r h-[90vh] border-gray-200 rounded-l-lg flex flex-col">
        <ChatList />
      </div>

      {/* Chat Content Area */}
      <div className="flex-1 flex flex-col h-[90vh] bg-white rounded-r-lg">
        {children}
      </div>
    </div>
  );
}
