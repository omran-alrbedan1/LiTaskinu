import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface FloatingChatProps {
    url:string;
}

const FloatingChatButton = ({url}:FloatingChatProps) => {
  return (
        <div className="fixed bottom-6 right-6 z-40">
        <Link 
          href={url}
          className="h-14 px-5 rounded-full bg-gradient-to-r from-primary-color1 to-primary-color1/80 shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center gap-3 hover:pr-20 overflow-hidden relative"
        >
          <MessageCircle className="h-5 w-5 text-white shrink-0 group-hover:animate-bounce" />
          <span className="text-sm font-medium text-white absolute right-5 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
            Start Chat
          </span>
        </Link>
      </div>
  )
}

export default FloatingChatButton