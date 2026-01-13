import { ChatInfo, Message } from "@/types/chat";

export const mockMessagesByChatId: Record<string, Message[]> = {
    "1": [
        { id: "1", content: "voice", sender: "other", timestamp: new Date(Date.now() - 300000), duration: "0:26" },
        { id: "2", text: "Of course! Thank you so much for taking your call. 😊", sender: "other", timestamp: new Date(Date.now() - 240000) },
        { id: "3", content: "voice", sender: "other", timestamp: new Date(Date.now() - 180000), duration: "0:14" },
        { id: "4", text: "Of course! Thank you so much for taking your call. 👍", sender: "other", timestamp: new Date(Date.now() - 120000) },
        { id: "5", content: "images", sender: "other", timestamp: new Date(Date.now() - 60000), images: ["/images/snow-mountain.jpg", "/images/snow-mountain.jpg"] },
        { id: "6", text: "Good question... 🤔", sender: "user", timestamp: new Date(Date.now() - 30000) },
    ],
    "2": [
        { id: "1", text: "Meeting reminder for tomorrow 📅", sender: "other", timestamp: new Date(Date.now() - 3600000) },
        { id: "2", text: "Thanks for the reminder! I'll be there. ✅", sender: "user", timestamp: new Date(Date.now() - 3500000) },
    ],
    "3": [{ id: "1", text: "Team updates are ready for review 📋", sender: "other", timestamp: new Date(Date.now() - 18000000) }],
};

const chatData: Record<string, ChatInfo> = {
    "1": { name: "Alex Linderson", avatar: "/images/userTest.jpg", online: true },
    "2": { name: "Team Align", avatar: "/images/userTest.jpg", online: true },
    "3": { name: "John Ahraham", avatar: "/images/userTest.jpg", online: false },
    "4": { name: "John Borino", avatar: "/images/userTest.jpg", online: true },
    "5": { name: "Angel Dayna", avatar: "/images/userTest.jpg", online: false },
    "6": { name: "Eben Hunt", avatar: "/images/userTest.jpg", online: true },
    "7": { name: "Team Updates", avatar: "/images/userTest.jpg", online: true },
};

export function getChatInfo(chatId: string): ChatInfo {
    return chatData[chatId] ?? { name: "Unknown", avatar: "U", online: false };
}
