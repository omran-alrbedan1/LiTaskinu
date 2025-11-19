"use client";

import React, { useState } from "react";
import { Table, Button, Dropdown, Tag, Avatar } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  MoreOutlined,
  DeleteOutlined,
  EyeOutlined,
  UnlockOutlined,
  LockOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getComplaintConfig } from "@/configs/complaints";
import { Badge } from "@/components/ui/badge";
import BanModal from "@/components/admin/shared/BanModal";
import { DeletePermanentModal } from "./DeleteModal";
import { UnblockModal } from "./UnblockModal";
import Link from "next/link";

const MOCK_BLOCKED_CHATS = [
  {
    id: "chat_007",
    user1: {
      id: "user_101",
      name: "Asma Khaled",
      email: "asma@example.com",
      avatar: "/images/userTest.jpg",
    },
    user2: {
      id: "user_102",
      name: "Hassan Ibrahim",
      email: "hassan@example.com",
      avatar: "/images/userTest.jpg",
    },
    complainant: {
      id: "user_101",
      name: "Asma Khaled",
      email: "asma@example.com",
      avatar: "/images/userTest.jpg",
    },
    reportedUser: {
      id: "user_102",
      name: "Hassan Ibrahim",
      email: "hassan@example.com",
      avatar: "/images/userTest.jpg",
    },
    reason: "Harassment",
    date: "2024-02-05",
    blockedBy: "Admin_01",
    blockDuration: "30 days",
    blockExpiry: "2024-03-07",
  },
  {
    id: "chat_008",
    user1: {
      id: "user_103",
      name: "Abdullah Nasser",
      email: "abdullah@example.com",
      avatar: "/images/userTest.jpg",
    },
    user2: {
      id: "user_104",
      name: "Lama Mohamed",
      email: "lama@example.com",
      avatar: "/images/userTest.jpg",
    },
    complainant: {
      id: "user_104",
      name: "Lama Mohamed",
      email: "lama@example.com",
      avatar: "/images/userTest.jpg",
    },
    reportedUser: {
      id: "user_103",
      name: "Abdullah Nasser",
      email: "abdullah@example.com",
      avatar: "/images/userTest.jpg",
    },
    reason: "Fake Profile",
    date: "2024-02-06",
    blockedBy: "Admin_02",
    blockDuration: "Permanent",
    blockExpiry: "Never",
  },
];

interface BlockedChatsTableProps {
  onDeleteChat: (chatId: string) => void;
}

export const BlockedChatsTable: React.FC<BlockedChatsTableProps> = ({
  onDeleteChat,
}) => {
  const [unblockModalVisible, setUnblockModalVisible] = useState(false);
  const [banModalVisible, setBanModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<BlockedChatType | null>(
    null
  );

  const getReasonColor = (reason: string) => {
    const config = getComplaintConfig(reason);
    return config.color;
  };

  const getDurationColor = (duration: string) => {
    const durationColors: { [key: string]: string } = {
      "24 hours": "blue",
      "7 days": "orange",
      "30 days": "red",
      "90 days": "purple",
      Permanent: "volcano",
    };
    return durationColors[duration] || "default";
  };

  // Unblock Modal Handlers
  const handleOpenUnblockModal = (chat: BlockedChatType) => {
    setSelectedChat(chat);
    setUnblockModalVisible(true);
  };

  const handleCloseUnblockModal = () => {
    setUnblockModalVisible(false);
    setSelectedChat(null);
  };

  const handleUnblockSuccess = (action: string) => {
    console.log(`User ${selectedChat?.reportedUser.name} ${action}`);
    alert(
      `User ${selectedChat?.reportedUser.name} has been ${action} successfully`
    );
    handleCloseUnblockModal();
  };

  // Delete Modal Handlers
  const handleOpenDeleteModal = (chat: BlockedChatType) => {
    setSelectedChat(chat);
    setDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedChat(null);
  };

  const handleDeleteSuccess = (action: string) => {
    console.log(`Chat ${selectedChat?.id} ${action}`);
    if (selectedChat) {
      onDeleteChat(selectedChat.id);
    }
    handleCloseDeleteModal();
  };

  // Ban Modal Handlers
  const handleOpenBanModal = (chat: BlockedChatType) => {
    setSelectedChat(chat);
    setBanModalVisible(true);
  };

  const handleCloseBanModal = () => {
    setBanModalVisible(false);
    setSelectedChat(null);
  };

  const handleBanSuccess = (action: string) => {
    console.log(`User ${selectedChat?.reportedUser.name} ${action}`);
    alert(
      `User ${selectedChat?.reportedUser.name} has been ${action} successfully`
    );
    handleCloseBanModal();
  };

  const columns: ColumnsType<BlockedChatType> = [
    {
      title: "Chat ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (id: string) => <span className="font-mono">{id}</span>,
    },
    {
      title: "Complainant",
      dataIndex: "complainant",
      key: "complainant",
      width: 180,
      render: (complainant: UserType) => (
        <Link
          href={`./users/${complainant.id}`}
          className="flex items-center gap-3"
        >
          <Avatar
            src={complainant.avatar}
            icon={<UserOutlined />}
            size="large"
            className="border-2 border-blue-200"
          />
          <div>
            <div className="font-medium">{complainant.name}</div>
            <div className="text-xs text-gray-500">{complainant.email}</div>
            <Tag color="blue" className="text-xs mt-1">
              Reporter
            </Tag>
          </div>
        </Link>
      ),
    },
    {
      title: "Reported User",
      dataIndex: "reportedUser",
      key: "reportedUser",
      width: 180,
      render: (reportedUser: UserType) => (
        <Link
          href={`./users/${reportedUser.id}`}
          className="flex items-center gap-3"
        >
          <Avatar
            src={reportedUser.avatar}
            size="large"
            className="border-2 border-red-200"
          />
          <div>
            <div className="font-medium text-red-500">{reportedUser.name}</div>
            <div className="text-xs text-gray-500">{reportedUser.email}</div>
            <Tag color="red" className="text-xs mt-1">
              Reported
            </Tag>
          </div>
        </Link>
      ),
    },
    {
      title: "Block Reason",
      dataIndex: "reason",
      key: "reason",
      width: 100,
      render: (reason: string) => {
        const complaintConfig = getComplaintConfig(reason);
        const ReasonIcon = complaintConfig.icon;

        return (
          <Badge
            style={{ backgroundColor: getReasonColor(reason) }}
            className="flex items-center gap-1 w-fit"
          >
            <ReasonIcon className="w-3 h-3" />
            {complaintConfig.text}
          </Badge>
        );
      },
    },
    {
      title: "Block Duration",
      dataIndex: "blockDuration",
      key: "blockDuration",
      width: 150,
      render: (duration: string, record: BlockedChatType) => (
        <div className="space-y-1">
          <Tag
            color={getDurationColor(duration)}
            icon={<ClockCircleOutlined />}
            className="flex items-center gap-1"
          >
            {duration}
          </Tag>
          <div className="text-xs text-gray-500">
            Expires: {record.blockExpiry}
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_: any, record: BlockedChatType) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: (
                  <Link href={`./chats/${record.id}`}>
                    <div
                      className="flex items-center"
                      onClick={() => console.log("View details:", record)}
                    >
                      <EyeOutlined className="mr-2 !text-blue-600" />
                      View Chat Details
                    </div>
                  </Link>
                ),
              },
              {
                key: "unblock",
                label: (
                  <div
                    className="flex items-center"
                    onClick={() => handleOpenUnblockModal(record)}
                  >
                    <UnlockOutlined className="mr-2 !text-green-600" />
                    Unblock User
                  </div>
                ),
              },
              {
                key: "block_again",
                label: (
                  <div
                    className="flex items-center"
                    onClick={() => handleOpenBanModal(record)}
                  >
                    <LockOutlined className="mr-2 !text-red-600" />
                    Block Again
                  </div>
                ),
              },
              {
                type: "divider",
              },
              {
                key: "delete",
                label: (
                  <div
                    className="flex items-center hover:text-white text-red-600"
                    onClick={() => handleOpenDeleteModal(record)}
                  >
                    <DeleteOutlined className="mr-2" />
                    Delete Permanently
                  </div>
                ),
                danger: true,
              },
            ],
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Blocked Chats</CardTitle>
          <CardDescription>
            Closed due to abuse or violation of usage policy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table
            columns={columns}
            dataSource={MOCK_BLOCKED_CHATS}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: 1100 }}
          />
        </CardContent>
      </Card>

      {/* Unblock Modal */}
      <UnblockModal
        open={unblockModalVisible}
        onCancel={handleCloseUnblockModal}
        chat={selectedChat}
        onSuccess={handleUnblockSuccess}
      />

      {/* Delete Modal */}
      <DeletePermanentModal
        open={deleteModalVisible}
        onCancel={handleCloseDeleteModal}
        chat={selectedChat}
        onSuccess={handleDeleteSuccess}
      />

      {/* Ban Modal */}
      <BanModal
        open={banModalVisible}
        onCancel={handleCloseBanModal}
        user={
          selectedChat
            ? {
                name: selectedChat.reportedUser.name,
                id: selectedChat.reportedUser.id,
              }
            : { name: "", id: "" }
        }
        onSuccess={handleBanSuccess}
      />
    </>
  );
};
