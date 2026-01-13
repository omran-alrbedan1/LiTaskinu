import { Image as AntdImage } from "antd";
import { Message } from "@/types/chat";
import { formatTime } from "@/utils/time";

function VoiceBubble({ isUser, duration }: { isUser: boolean; duration?: string }) {
  return (
    <div className={`${isUser ? "bg-blue-500" : "bg-primary-color1"} rounded-2xl p-3 flex items-center gap-2`}>
      <div className="w-6 h-6 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-0.5" />
      </div>

      <div className="flex-1 h-6 flex items-center gap-0.5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-0.5 bg-white rounded-full"
            style={{ height: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <span className="text-white text-xs">{duration}</span>
    </div>
  );
}

function ImagesBubble({ images = [], ariaLabelPrefix }: { images?: string[]; ariaLabelPrefix: string }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <div className="w-20 h-20 bg-gray-200 rounded-2xl overflow-hidden">
            <AntdImage
              src={image}
              alt={`${ariaLabelPrefix} ${index + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TextBubble({ isUser, text }: { isUser: boolean; text?: string }) {
  return (
    <div className={`${isUser ? "bg-blue-500" : "bg-primary-color1"} rounded-2xl px-4 py-2`}>
      <p className="text-white text-sm">{text}</p>
    </div>
  );
}

export function MessageBubble({
  message,
  ariaSentImage,
}: {
  message: Message;
  ariaSentImage: string;
}) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-md ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        {message.content === "voice" ? (
          <VoiceBubble isUser={isUser} duration={message.duration} />
        ) : message.content === "images" ? (
          <ImagesBubble images={message.images} ariaLabelPrefix={ariaSentImage} />
        ) : (
          <TextBubble isUser={isUser} text={message.text} />
        )}

        <span className="text-xs text-gray-400 mt-1">
          Today {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
