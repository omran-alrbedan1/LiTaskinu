import { ReactNode } from "react";
import ChatList from "./_components/ChatList";

interface ChatLayoutProps {
  children: ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex h-screen ">
      <div className="flex w-full overflow-hidden shadow-sm ">
        {/* Chat List Sidebar */}
        <aside className="w-80 shrink-0 bg-white border-r border-gray-200 flex flex-col py-4 ">
          <ChatList />
        </aside>

        {/* Chat Content Area */}
        <main className="flex-1 flex flex-col bg-white py-4">
          {children}
        </main>
      </div>
    </div>
  );
}
