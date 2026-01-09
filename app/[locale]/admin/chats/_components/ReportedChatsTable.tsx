"use client";

import React, { useState } from "react";
import { Table, Button, Dropdown, Avatar, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  MoreOutlined,
  BlockOutlined,
  WarningOutlined,
  DeleteOutlined,
  UserOutlined,
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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DeletePermanentModal } from "./DeleteModal"; // Adjust path as needed
import { SendWarningModal } from "@/components/admin/shared";

const MOCK_REPORTS = [
  {
    id: "rep_001",
    chatId: "chat_005",
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
        user: "user_789",
        text: "Inappropriate language here...",
        time: "14:20",
      },
      { user: "user_123", text: "This is unacceptable", time: "14:21" },
      { user: "user_789", text: "Don't mind my words", time: "14:22" },
      { user: "user_123", text: "I will report you", time: "14:23" },
    ],
  },
  {
    id: "rep_002",
    chatId: "chat_006",
    complainant: {
      id: "user_456",
      name: "Fatima Ahmed",
      email: "fatima@example.com",
      avatar: "/images/userTest.jpg",
    },
    reportedUser: {
      id: "user_789",
      name: "Khaled Mohamed",
      email: "khaled@example.com",
      avatar: "/images/userTest.jpg",
    },
    reason: "Fake Profile",
    date: "2024-02-11",
    messages: [
      { user: "user_456", text: "I am a specialized doctor", time: "11:30" },
      {
        user: "user_789",
        text: "But your picture doesn't show that",
        time: "11:31",
      },
      { user: "user_456", text: "This is an old picture", time: "11:32" },
      {
        user: "user_789",
        text: "This is fraud and I will report you!",
        time: "11:33",
      },
    ],
  },
  {
    id: "rep_003",
    chatId: "chat_007",
    complainant: {
      id: "user_111",
      name: "Mohammed Ali",
      email: "mohammed@example.com",
      avatar: "/images/userTest.jpg",
    },
    reportedUser: {
      id: "user_222",
      name: "Lina Hassan",
      email: "lina@example.com",
      avatar: "/images/userTest.jpg",
    },
    reason: "Spam",
    date: "2024-02-12",
    messages: [
      { user: "user_111", text: "Buy this product now!", time: "09:15" },
      { user: "user_222", text: "Stop spamming", time: "09:16" },
    ],
  },
  {
    id: "rep_004",
    chatId: "chat_008",
    complainant: {
      id: "user_333",
      name: "Ahmed Saleh",
      email: "ahmed@example.com",
      avatar: "/images/userTest.jpg",
    },
    reportedUser: {
      id: "user_444",
      name: "Noura Abdullah",
      email: "noura@example.com",
      avatar: "/images/userTest.jpg",
    },
    reason: "Inappropriate Content",
    date: "2024-02-13",
    messages: [
      { user: "user_333", text: "Inappropriate message", time: "16:45" },
      { user: "user_444", text: "This is wrong", time: "16:46" },
    ],
  },
];

interface ReportedChatsTableProps {
  onOpenBanModal: (report: any) => void;
  onOpenWarningModal: (report: any) => void;
  onDeleteChat: (chatId: string) => void;
}

interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface ReportType {
  id: string;
  chatId: string;
  complainant: UserType;
  reportedUser: UserType;
  reason: string;
  date: string;
  messages: Array<{
    user: string;
    text: string;
    time: string;
  }>;
}

export const ReportedChatsTable: React.FC<ReportedChatsTableProps> = ({
  onOpenWarningModal,
  onOpenBanModal,
  onDeleteChat,
}) => {
  const router = useRouter();
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);

  const getReasonColor = (reason: string) => {
    const config = getComplaintConfig(reason);
    return config.color;
  };

  const handleUserClick = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  // Warning Modal Handlers
  const handleOpenWarningModal = (report: ReportType) => {
    setSelectedReport(report);
    setWarningModalVisible(true);
  };

  const handleCloseWarningModal = () => {
    setWarningModalVisible(false);
    setSelectedReport(null);
  };

  const handleWarningSuccess = (warningData: any) => {
    console.log(
      `Warning sent to ${selectedReport?.reportedUser.name}:`,
      warningData
    );
    alert(
      `Warning has been sent to ${selectedReport?.reportedUser.name} successfully`
    );
    handleCloseWarningModal();
  };

  // Delete Modal Handlers
  const handleOpenDeleteModal = (report: ReportType) => {
    setSelectedReport(report);
    setDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedReport(null);
  };

  const handleDeleteSuccess = (action: string) => {
    console.log(`Chat ${selectedReport?.chatId} ${action}`);
    if (selectedReport) {
      onDeleteChat(selectedReport.chatId);
    }
    handleCloseDeleteModal();
  };

  const columns: ColumnsType<ReportType> = [
    {
      title: "Chat ID",
      dataIndex: "chatId",
      key: "chatId",
      width: 120,
      render: (chatId: string) => <span className="font-mono">{chatId}</span>,
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
            className="border-2 border-blue-200 cursor-pointer hover:scale-105 transition-transform"
          />
          <div>
            <div className="font-medium cursor-pointer hover:text-blue-600 transition-colors">
              {complainant.name}
            </div>
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
            icon={<UserOutlined />}
            size="large"
            className="border-2 border-red-200 cursor-pointer hover:scale-105 transition-transform"
          />
          <div>
            <div
              className="font-medium cursor-pointer text-red-500 hover:text-red-600 transition-colors"
              onClick={() => handleUserClick(reportedUser.id)}
            >
              {reportedUser.name}
            </div>
            <div className="text-xs text-gray-500">{reportedUser.email}</div>
            <Tag color="red" className="text-xs mt-1">
              Reported
            </Tag>
          </div>
        </Link>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: 150,
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_: any, record: ReportType) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: (
                  <Link href={`./chats/${record.chatId}`}>
                    <div className="flex items-center">
                      <EyeOutlined className="mr-2 !text-blue-600" />
                      View Chat Details
                    </div>
                  </Link>
                ),
              },
              {
                key: "warn",
                label: (
                  <div
                    className="flex items-center"
                    onClick={() => handleOpenWarningModal(record)}
                  >
                    <WarningOutlined className="mr-2 !text-orange-600" />
                    Send Warning
                  </div>
                ),
              },
              {
                key: "ban",
                label: (
                  <div
                    className="flex items-center"
                    onClick={() => onOpenBanModal(record)}
                  >
                    <BlockOutlined className="mr-2 !text-red-600" />
                    Ban User
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
                    className="flex items-center text-red-600 hover:text-white"
                    onClick={() => handleOpenDeleteModal(record)}
                  >
                    <DeleteOutlined className="mr-2" />
                    Delete Chat
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
          <CardTitle>Reported Chats</CardTitle>
          <CardDescription>
            Chats reported by users - Can be reviewed and actions taken
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table
            columns={columns}
            dataSource={MOCK_REPORTS}
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

      {/* Warning Modal */}
      <SendWarningModal
        visible={warningModalVisible}
        onCancel={handleCloseWarningModal}
        onConfirm={handleWarningSuccess}
        user={selectedReport}
      />

      {/* Delete Modal */}
      <DeletePermanentModal
        open={deleteModalVisible}
        onCancel={handleCloseDeleteModal}
        chat={
          selectedReport
            ? {
                id: selectedReport.chatId,
                complainant: selectedReport.complainant,
                reportedUser: selectedReport.reportedUser,
                reason: selectedReport.reason,
                // Add any other required properties for BlockedChatType
                user1: selectedReport.complainant,
                user2: selectedReport.reportedUser,
                date: selectedReport.date,
                blockedBy: "Admin",
                blockDuration: "Permanent",
                blockExpiry: "Never",
              }
            : null
        }
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
};
