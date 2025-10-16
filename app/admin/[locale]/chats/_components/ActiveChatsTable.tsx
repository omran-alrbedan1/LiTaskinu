"use client";

import React from "react";
import { Table, Button, Avatar, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined } from "@ant-design/icons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MOCK_ACTIVE_CHATS = [
  {
    id: "chat_001",
    user1: {
      id: "user_123",
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      avatar: "/images/userTest.jpg",
    },
    user2: {
      id: "user_456",
      name: "Sara Ali",
      email: "sara@example.com",
      avatar: "/images/userTest.jpg",
    },
    startedAt: "2024-01-20 10:30",
    messageCount: 45,
    status: "active",
  },
  {
    id: "chat_002",
    user1: {
      id: "user_789",
      name: "Mohamed Khaled",
      email: "mohamed@example.com",
      avatar: "/images/userTest.jpg",
    },
    user2: {
      id: "user_012",
      name: "Fatima Abdullah",
      email: "fatima@example.com",
      avatar: "/images/userTest.jpg",
    },
    startedAt: "2024-01-20 09:15",
    messageCount: 23,
    status: "active",
  },
];

interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface ActiveChatType {
  id: string;
  user1: UserType;
  user2: UserType;
  startedAt: string;
  messageCount: number;
  status: string;
}

export const ActiveChatsTable: React.FC = () => {
  const router = useRouter();

  const handleUserClick = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  const columns: ColumnsType<ActiveChatType> = [
    {
      title: "Chat ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (id: string) => <span className="font-mono">{id}</span>,
    },
    {
      title: "User 1",
      dataIndex: "user1",
      key: "user1",
      width: 180,
      render: (user1: UserType) => (
        <Link href={`./users/${user1.id}`} className="flex items-center gap-3">
          <Avatar
            src={user1.avatar}
            icon={<UserOutlined />}
            size="large"
            className="border-2 border-blue-200 cursor-pointer hover:scale-105 transition-transform"
          />
          <div>
            <div className="font-medium cursor-pointer text-blue-600 hover:text-blue-600 transition-colors">
              {user1.name}
            </div>
            <div className="text-xs text-gray-500">{user1.email}</div>
            <Tag color="blue" className="text-xs mt-1">
              Participant
            </Tag>
          </div>
        </Link>
      ),
    },
    {
      title: "User 2",
      dataIndex: "user2",
      key: "user2",
      width: 180,
      render: (user2: UserType) => (
        <Link href={`./users/${user2.id}`} className="flex items-center gap-3">
          <Avatar
            src={user2.avatar}
            icon={<UserOutlined />}
            size="large"
            className="border-2 border-green-200 cursor-pointer hover:scale-105 transition-transform"
          />
          <div>
            <div className="font-medium cursor-pointer text-green-500 hover:text-green-600 transition-colors">
              {user2.name}
            </div>
            <div className="text-xs text-gray-500">{user2.email}</div>
            <Tag color="green" className="text-xs mt-1">
              Participant
            </Tag>
          </div>
        </Link>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startedAt",
      key: "startedAt",
      width: 150,
      render: (startedAt: string) => (
        <div className="text-sm text-gray-700">{startedAt}</div>
      ),
    },
    {
      title: "Messages",
      dataIndex: "messageCount",
      key: "messageCount",
      width: 100,
      render: (count: number) => (
        <div className="text-center">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            {count} messages
          </Badge>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          Active
        </Badge>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Chats</CardTitle>
        <CardDescription>
          All currently active chats - View only
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table
          columns={columns}
          dataSource={MOCK_ACTIVE_CHATS}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 1000 }}
        />
      </CardContent>
    </Card>
  );
};
