"use client";

import { RefObject, useState } from "react";
import { Send, Smile, Paperclip } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Button } from "antd";
import { useClickOutside } from "@/hooks/chats/useClickOutside";

export function ChatComposer({
  value,
  onChange,
  onSend,
  disabled,
  fileInputRef,
  onPickFiles,
  tPlaceholder,
  emojiPickerRef,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: (e: React.FormEvent) => void;
  disabled: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  onPickFiles: (files: FileList | null) => void;
  tPlaceholder: string;
  emojiPickerRef: RefObject<HTMLDivElement>;
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange(value + emojiData.emoji);
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 relative">
      <form onSubmit={onSend} className="flex items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => onPickFiles(e.target.files)}
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
          placeholder={tPlaceholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-color1"
        />

        <div className="relative" ref={emojiPickerRef}>
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setShowEmojiPicker((p) => !p)}
          >
            <Smile className="w-5 h-5 text-gray-500" />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 mb-2 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <Button
          icon={<Send size={20} className="mt-1" />}
          type="primary"
          disabled={disabled}
          className="!w-10 !h-10"
          onClick={onSend}
        />
      </form>
    </div>
  );
}
