"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { Badge } from "@/components/ui/badge";
import { getComplaintConfig } from "@/configs/complaints";
import { Header } from "@/components/admin/shared";
import { TiMessages } from "react-icons/ti";
import { BsPeopleFill } from "react-icons/bs";

const MOCK_CHATS = {
  id: "chat_005",
  complainant: {
    id: "user_123",
    name: "Sara Mohamed",
    email: "sara@example.com",
    avatar: "/images/userTest.jpg",
  },
  reportedUser: {
    id: "user_789",
    name: "Ali Youssef",
    email: "ali@example.com",
    avatar: "/images/userTest.jpg",
  },
  reason: "Harassment",
  date: "2024-02-10",
  messages: [
    {
      id: "msg_1",
      user: "user_789",
      userName: "Ali Youssef",
      text: "Inappropriate language here...",
      time: "14:20",
      timestamp: "2024-02-10T14:20:00Z",
    },
    {
      id: "msg_2",
      user: "user_123",
      userName: "Sara Mohamed",
      text: "This is unacceptable",
      time: "14:21",
      timestamp: "2024-02-10T14:21:00Z",
    },
    {
      id: "msg_3",
      user: "user_789",
      userName: "Ali Youssef",
      text: "Don't mind my words",
      time: "14:22",
      timestamp: "2024-02-10T14:22:00Z",
    },
    {
      id: "msg_4",
      user: "user_123",
      userName: "Sara Mohamed",
      text: "I will report you",
      time: "14:23",
      timestamp: "2024-02-10T14:23:00Z",
    },
  ],
};

export default function ChatDetailsPage() {
  const router = useRouter();

  const chat = MOCK_CHATS;

  if (!chat) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md border-0 shadow-sm dark:bg-gray-800">
          <CardContent className="p-12 text-center">
            <div className="mb-6 text-6xl">💬</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Chat Not Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              The requested chat could not be found.
            </p>
            <Button
              type="primary"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push("/admin/reports")}
              size="large"
              className="h-10 px-6"
            >
              Back to Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const complaintConfig = getComplaintConfig(chat.reason);

  return (
    <div className="max-h-[90vh] overflow-clip p-6 ">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Header
            title="Chat Investigation"
            description={`Chat ID : ${chat.id}`}
          />
          <Badge
            style={{ backgroundColor: complaintConfig.color }}
            className="flex items-center gap-2 px-3 py-1 text-sm"
          >
            <complaintConfig.icon className="w-3 h-3" />
            {complaintConfig.text}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar - User Information */}
          <div className="xl:col-span-1 space-y-6">
            <Card className="">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium dark:text-white">
                  <BsPeopleFill className="inline-block m-1 mb-2 size-5 text-primary-color1" />
                  Participants
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Users involved in this chat
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Complainant */}
                <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700">
                  <Avatar
                    src={chat.complainant.avatar}
                    icon={<UserOutlined />}
                    size={40}
                    className="border border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                      {chat.complainant.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                      {chat.complainant.email}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                        Reporter
                      </span>
                      <Button
                        type="link"
                        size="small"
                        onClick={() =>
                          router.push(`/admin/users/${chat.complainant.id}`)
                        }
                        className="p-0 h-auto text-xs text-blue-600 dark:text-blue-400"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Reported User */}
                <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700">
                  <Avatar
                    src={chat.reportedUser.avatar}
                    icon={<UserOutlined />}
                    size={40}
                    className="border border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                      {chat.reportedUser.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                      {chat.reportedUser.email}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                        Reported
                      </span>
                      <Button
                        type="link"
                        size="small"
                        onClick={() =>
                          router.push(`/admin/users/${chat.reportedUser.id}`)
                        }
                        className="p-0 h-auto text-xs text-blue-600 dark:text-blue-400"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Details */}
            <Card className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium dark:text-white flex items-center gap-2">
                  <FlagOutlined className="!text-primary-color1" />
                  Report Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Date:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {chat.date}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Messages:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {chat.messages.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Messages */}
          <div className="xl:col-span-3">
            <Card className="">
              <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center gap-2 text-base font-medium dark:text-white">
                  <TiMessages className="text-primary-color1 size-5 " />
                  Conversation
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Chat between{" "}
                  <span className="font-bold text-blue-600 mx-1">
                    {chat.complainant.name}
                  </span>{" "}
                  and
                  <span className="font-bold text-red-500 mx-1">
                    {chat.reportedUser.name}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[425px] overflow-y-auto p-6 space-y-4">
                  {chat.messages.map((message) => {
                    const isComplainant = message.user === chat.complainant.id;
                    const user = isComplainant
                      ? chat.complainant
                      : chat.reportedUser;

                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          isComplainant ? "justify-start" : "justify-end"
                        }`}
                      >
                        {isComplainant && (
                          <Avatar
                            src={user.avatar}
                            icon={<UserOutlined />}
                            size={36}
                            className="flex-shrink-0 border border-gray-200 dark:border-gray-600"
                          />
                        )}

                        <div
                          className={`max-w-[75%] rounded-lg px-3 py-2 ${
                            isComplainant
                              ? "bg-gray-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-medium ${
                                isComplainant
                                  ? "text-gray-700 dark:text-gray-300"
                                  : "text-blue-100"
                              }`}
                            >
                              {user.name}
                            </span>
                            <span
                              className={`text-xs ${
                                isComplainant
                                  ? "text-gray-500 dark:text-gray-400"
                                  : "text-blue-200"
                              }`}
                            >
                              {message.time}
                            </span>
                          </div>
                          <p
                            className={`text-sm ${
                              isComplainant
                                ? "text-gray-800 dark:text-gray-200"
                                : "text-white"
                            }`}
                          >
                            {message.text}
                          </p>
                        </div>

                        {!isComplainant && (
                          <Avatar
                            src={user.avatar}
                            icon={<UserOutlined />}
                            size={36}
                            className="flex-shrink-0 border border-gray-200 dark:border-gray-600"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
