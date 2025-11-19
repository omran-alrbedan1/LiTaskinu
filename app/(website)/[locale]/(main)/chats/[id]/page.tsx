"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import {
  Video,
  Phone,
  MoreVertical,
  Send,
  Smile,
  Paperclip,
  X,
} from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Image as AntdImage, Button } from "antd";
import Image from "next/image";

interface Message {
  id: string;
  text?: string;
  sender: "user" | "other";
  timestamp: Date;
  content?: "voice" | "images";
  duration?: string;
  images?: string[];
}

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Mock data matching your design with voice messages and images
  const mockMessages: Record<string, Message[]> = {
    "1": [
      {
        id: "1",
        content: "voice",
        sender: "other",
        timestamp: new Date(Date.now() - 300000),
        duration: "0:26",
      },
      {
        id: "2",
        text: "Of course! Thank you so much for taking your call. 😊",
        sender: "other",
        timestamp: new Date(Date.now() - 240000),
      },
      {
        id: "3",
        content: "voice",
        sender: "other",
        timestamp: new Date(Date.now() - 180000),
        duration: "0:14",
      },
      {
        id: "4",
        text: "Of course! Thank you so much for taking your call. 👍",
        sender: "other",
        timestamp: new Date(Date.now() - 120000),
      },
      {
        id: "5",
        content: "images",
        sender: "other",
        timestamp: new Date(Date.now() - 60000),
        images: ["/images/snow-mountain.jpg", "/images/snow-mountain.jpg"],
      },
      {
        id: "6",
        text: "Good question. I think about just discussing PiXood question. How about just discussing P✓Good question. How about just discussing P✓Good question. How about... 🤔",
        sender: "user",
        timestamp: new Date(Date.now() - 30000),
      },
    ],
    "2": [
      {
        id: "1",
        text: "Meeting reminder for tomorrow 📅",
        sender: "other",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "2",
        text: "Thanks for the reminder! I'll be there. ✅",
        sender: "user",
        timestamp: new Date(Date.now() - 3500000),
      },
    ],
    "3": [
      {
        id: "1",
        text: "Team updates are ready for review 📋",
        sender: "other",
        timestamp: new Date(Date.now() - 18000000),
      },
    ],
  };

  const getChatInfo = (id: string) => {
    const chatData = {
      "1": {
        name: "Alex Linderson",
        avatar: "/images/userTest.jpg",
        online: true,
      },
      "2": { name: "Team Align", avatar: "/images/userTest.jpg", online: true },
      "3": {
        name: "John Ahraham",
        avatar: "/images/userTest.jpg",
        online: false,
      },
      "4": {
        name: "John Borino",
        avatar: "/images/userTest.jpg",
        online: true,
      },
      "5": {
        name: "Angel Dayna",
        avatar: "/images/userTest.jpg",
        online: false,
      },
      "6": { name: "Eben Hunt", avatar: "/images/userTest.jpg", online: true },
      "7": {
        name: "Team Updates",
        avatar: "/images/userTest.jpg",
        online: true,
      },
    };
    return (
      chatData[id as keyof typeof chatData] || {
        name: "Unknown",
        avatar: "U",
        online: false,
      }
    );
  };

  // Improved scroll to bottom function
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
  };

  useEffect(() => {
    const chatMessages = mockMessages[chatId] || [];
    setMessages(chatMessages);

    // Scroll to bottom when chat changes
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }, [chatId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setSelectedImages((prev) => [...prev, ...newImages]);

      // Create preview URLs
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]); // Clean up memory
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    // If we have images but no text, send images
    if (selectedImages.length > 0 && !newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "user",
        timestamp: new Date(),
        content: "images",
        images: imagePreviews, // In real app, you'd upload these to a server
      };

      setMessages((prev) => [...prev, message]);
      setSelectedImages([]);
      setImagePreviews([]);

      // Simulate reply after 1 second
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          text: "Nice photos! 📸",
          sender: "other",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, reply]);
      }, 1000);
      return;
    }

    // If we have text (with or without images)
    if (newMessage.trim() || selectedImages.length > 0) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim() || undefined,
        sender: "user",
        timestamp: new Date(),
      };

      // If we have images, add them to the message
      if (selectedImages.length > 0) {
        message.content = "images";
        message.images = imagePreviews;
      }

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      setSelectedImages([]);
      setImagePreviews([]);

      // Simulate reply after 1 second
      setTimeout(() => {
        const replyText =
          selectedImages.length > 0
            ? "Great! Thanks for sharing the images! 🎉"
            : "Thanks for your message! I'll get back to you soon. 👍";

        const reply: Message = {
          id: (Date.now() + 1).toString(),
          text: replyText,
          sender: "other",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, reply]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const chatInfo = getChatInfo(chatId);

  return (
    <div className="flex flex-col h-full hide">
      {/* Chat Header */}
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
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{chatInfo.name}</h2>
            <p className="text-xs text-green-500">
              {chatInfo.online ? "Online" : "Offline"}
            </p>
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

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-4"
      >
        <div className="text-center">
          <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
            Today
          </span>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md ${
                message.sender === "user" ? "items-end" : "items-start"
              } flex flex-col`}
            >
              {message.content === "voice" ? (
                <div
                  className={`${
                    message.sender === "user"
                      ? "bg-blue-500"
                      : "bg-primary-color1"
                  } rounded-2xl p-3 flex items-center gap-2`}
                >
                  <div className="w-6 h-6 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-0.5"></div>
                  </div>
                  <div className="flex-1 h-6 flex items-center gap-0.5">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-white rounded-full"
                        style={{ height: `${Math.random() * 100}%` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-white text-xs">{message.duration}</span>
                </div>
              ) : message.content === "images" ? (
                <div className="flex gap-2 flex-wrap">
                  {message.images?.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="w-20 h-20 bg-gray-200 rounded-2xl overflow-hidden">
                        <AntdImage
                          src={image}
                          alt={`Sent image ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`${
                    message.sender === "user"
                      ? "bg-blue-500"
                      : "bg-primary-color1"
                  } rounded-2xl px-4 py-2`}
                >
                  <p className="text-white text-sm">{message.text}</p>
                </div>
              )}
              <span className="text-xs text-gray-400 mt-1">
                Today {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2 overflow-x-auto">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                  <AntdImage
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute !z-50 top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Input - Fixed at bottom */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 relative">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            multiple
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-5 h-5 text-primary-color1" />
          </button>

          <input
            type="text"
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-color1"
          />

          <div className="relative" ref={emojiPickerRef}>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="w-5 h-5 text-gray-500" />
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <Button
            icon={<Send size={20} className="mt-1" />}
            type="primary"
            disabled={!newMessage.trim() && selectedImages.length === 0}
            className="!w-10 !h-10 "
            onClick={handleSendMessage}
          />
        </form>
      </div>
    </div>
  );
}
