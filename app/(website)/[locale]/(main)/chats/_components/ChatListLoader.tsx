import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const ChatListLoader = () => (
  <div className="flex flex-col h-full hide-scrollbar">
    {/* Search Skeleton */}
    <div className="p-4 flex-shrink-0">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Skeleton className="w-full h-10 bg-gray-100 rounded-lg" />
      </div>
    </div>

    {/* Conversation count Skeleton */}
    <div className="px-4 pb-3 flex-shrink-0">
      <Skeleton className="h-4 w-24 bg-gray-300 rounded" />
    </div>

    {/* Conversations list loader */}
    <div className="flex-1 overflow-y-auto hide-scrollbar">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-4">
          <div className="relative">
            <Skeleton className="w-11 h-11 rounded-full bg-gray-300" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex justify-between items-start">
              <Skeleton className="h-4 w-24 bg-gray-300 rounded" />
              <Skeleton className="h-3 w-12 bg-gray-300 rounded" />
            </div>
            <Skeleton className="h-3 w-32 bg-gray-300 rounded" />
          </div>
          <Skeleton className="w-6 h-6 rounded-full bg-gray-300" />
        </div>
      ))}
    </div>
  </div>
);
export default ChatListLoader;
