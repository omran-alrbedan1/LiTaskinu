export type Sender = "user" | "other";
export type MessageContent = "voice" | "images";

export interface Message {
  id: string;
  text?: string;
  sender: Sender;
  timestamp: Date;
  content?: MessageContent;
  duration?: string;
  images?: string[];
}

export interface ChatInfo {
  name: string;
  avatar: string;
  online: boolean;
}
