"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Button,
  Input,
  Table,
  Tag,
  Dropdown,
  Modal,
  message,
  DatePicker,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  DeleteOutlined,
  SendOutlined,
  MoreOutlined,
  MailOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Mail, Send, Archive, Trash2 } from "lucide-react";
import { Header, StatsCard } from "@/components/admin/shared";
import Image from "next/image";
import { images } from "@/constants/images";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

// Mock data for messages
const MOCK_MESSAGES: MessageType[] = [
  {
    key: "1",
    subject: "Welcome to Our Platform",
    message:
      "We are pleased to welcome you to our Islamic Marriage Platform. Please complete your profile...",
    sentTo: [
      {
        name: "Ahmed Hassan",
        email: "ahmed.hassan@email.com",
        avatar: "/images/userTest.jpg",
        relationship: "Father",
      },
    ],
    sentBy: "Admin",
    sentDate: "2024-10-15 10:30 AM",
    status: "delivered",
    recipientCount: 1,
    type: "single",
  },
  {
    key: "2",
    subject: "Monthly Newsletter - October 2024",
    message:
      "Dear parents, here is our monthly update about platform activities and success stories...",
    sentTo: [
      {
        name: "Multiple Recipients",
        email: "bulk@message.com",
        avatar: "/images/userTest.jpg",
        relationship: "All",
      },
    ],
    sentBy: "Admin",
    sentDate: "2024-10-14 09:00 AM",
    status: "delivered",
    recipientCount: 45,
    type: "bulk",
  },
  {
    key: "3",
    subject: "Profile Completion Reminder",
    message:
      "Your child's profile is incomplete. Please log in and complete the remaining sections...",
    sentTo: [
      {
        name: "Fatima Ali",
        email: "fatima.ali@email.com",
        avatar: "/images/userTest.jpg",
        relationship: "Mother",
      },
    ],
    sentBy: "Admin",
    sentDate: "2024-10-13 02:15 PM",
    status: "pending",
    recipientCount: 1,
    type: "single",
  },
  {
    key: "4",
    subject: "Security Update Notice",
    message:
      "We have updated our security protocols. Please review the new guidelines...",
    sentTo: [
      {
        name: "Multiple Recipients",
        email: "bulk@message.com",
        avatar: "/images/userTest.jpg",
        relationship: "All",
      },
    ],
    sentBy: "Admin",
    sentDate: "2024-10-12 11:00 AM",
    status: "failed",
    recipientCount: 38,
    type: "bulk",
  },
  {
    key: "5",
    subject: "Match Suggestion Available",
    message:
      "We have found a potential match for your child. Please review the profile...",
    sentTo: [
      {
        name: "Mohammed Khalid",
        email: "mohammed.k@email.com",
        avatar: "/images/userTest.jpg",
        relationship: "Guardian",
      },
    ],
    sentBy: "Admin",
    sentDate: "2024-10-11 04:30 PM",
    status: "delivered",
    recipientCount: 1,
    type: "single",
  },
];

type MessageType = {
  key: string;
  subject: string;
  message: string;
  sentTo: {
    name: string;
    email: string;
    avatar: string;
    relationship: string;
  }[];
  sentBy: string;
  sentDate: string;
  status: "delivered" | "pending" | "failed";
  recipientCount: number;
  type: "single" | "bulk";
};

export default function ParentMessagesManagementPage() {
  const [messages, setMessages] = useState<MessageType[]>(MOCK_MESSAGES);
  const [selectedMessages, setSelectedMessages] = useState<MessageType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Calculate statistics
  const totalMessages = messages.length;
  const deliveredMessages = messages.filter(
    (m) => m.status === "delivered"
  ).length;
  const pendingMessages = messages.filter((m) => m.status === "pending").length;
  const failedMessages = messages.filter((m) => m.status === "failed").length;

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchText.toLowerCase()) ||
      msg.sentTo.some(
        (recipient) =>
          recipient.name.toLowerCase().includes(searchText.toLowerCase()) ||
          recipient.email.toLowerCase().includes(searchText.toLowerCase())
      );

    const matchesStatus = statusFilter === "all" || msg.status === statusFilter;
    const matchesType = typeFilter === "all" || msg.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle view message
  const handleViewMessage = (msg: MessageType) => {
    setSelectedMessage(msg);
    setViewModalOpen(true);
  };

  // Handle delete
  const handleDelete = (msg: MessageType) => {
    setSelectedMessages([msg]);
    setDeleteModalOpen(true);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedMessages.length === 0) {
      message.warning("Please select messages to delete");
      return;
    }
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const selectedKeys = selectedMessages.map((m) => m.key);
      setMessages(messages.filter((msg) => !selectedKeys.includes(msg.key)));
      setSelectedMessages([]);

      const successMessage =
        selectedMessages.length === 1
          ? "Message deleted successfully"
          : `${selectedMessages.length} messages deleted successfully`;

      message.success(successMessage);
      setDeleteModalOpen(false);
    } catch (error) {
      message.error("Error occurred while deleting");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Status tag renderer
  const renderStatus = (status: string) => {
    const statusConfig = {
      delivered: {
        color: "success",
        icon: <CheckCircleOutlined />,
        text: "Delivered",
      },
      pending: {
        color: "processing",
        icon: <ClockCircleOutlined />,
        text: "Pending",
      },
      failed: { color: "error", icon: <CloseCircleOutlined />, text: "Failed" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  // Table columns
  const columns: ColumnsType<MessageType> = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (subject: string, record: MessageType) => (
        <div>
          <div className="font-medium text-base">{subject}</div>
          <div className="text-xs text-gray-500 mt-1">
            {record.message.substring(0, 60)}...
          </div>
        </div>
      ),
    },
    {
      title: "Recipients",
      dataIndex: "sentTo",
      key: "recipients",
      render: (sentTo: MessageType["sentTo"], record: MessageType) => (
        <div className="flex items-center gap-2">
          {record.type === "bulk" ? (
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                  {record.recipientCount}
                </div>
              </div>
              <span className="text-sm text-gray-600">
                {record.recipientCount} Parents
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src={sentTo[0]?.avatar || images.Unknown}
                height={32}
                width={32}
                className="rounded-full"
                alt={sentTo[0]?.name || "recipient"}
              />
              <div>
                <div className="font-medium text-sm">{sentTo[0]?.name}</div>
                <div className="text-xs text-gray-500">{sentTo[0]?.email}</div>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === "bulk" ? "purple" : "blue"}>
          {type === "bulk" ? "Bulk Message" : "Single Message"}
        </Tag>
      ),
    },
    {
      title: "Date Sent",
      dataIndex: "sentDate",
      key: "sentDate",
      render: (date: string) => <div className="text-sm">{date}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderStatus,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: (
                  <div className="flex items-center">
                    <EyeOutlined className="mr-2" />
                    View Details
                  </div>
                ),
                onClick: () => handleViewMessage(record),
              },
              {
                key: "resend",
                label: (
                  <div className="flex items-center text-blue-600">
                    <SendOutlined className="mr-2" />
                    Resend Message
                  </div>
                ),
                onClick: () => message.info("Resend functionality coming soon"),
              },
              {
                type: "divider",
              },
              {
                key: "delete",
                label: (
                  <div className="flex items-center text-red-600">
                    <DeleteOutlined className="mr-2" />
                    Delete
                  </div>
                ),
                onClick: () => handleDelete(record),
              },
            ],
          }}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 max-h-[90vh] overflow-auto sidebar-scrollbar">
      {/* Header */}
      <Header
        title="Parent Messages Management"
        description="View and manage all messages sent to parents in the system"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          icon={Mail}
          title="Total Messages"
          value={totalMessages}
          description="All sent messages"
          iconBgColor="from-blue-500 to-blue-600"
        />
        <StatsCard
          icon={Send}
          title="Delivered"
          value={deliveredMessages}
          description="Successfully delivered"
          iconBgColor="from-green-500 to-green-600"
        />
        <StatsCard
          icon={Archive}
          title="Pending"
          value={pendingMessages}
          description="Awaiting delivery"
          iconBgColor="from-yellow-500 to-yellow-600"
        />
        <StatsCard
          icon={Trash2}
          title="Failed"
          value={failedMessages}
          description="Delivery failed"
          iconBgColor="from-red-500 to-red-600"
        />
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle>Messages History</CardTitle>
          <CardDescription>
            All messages sent to parents from the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <Input
                placeholder="Search by subject, message, or recipient..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 350 }}
              />
              <Select
                placeholder="Status"
                style={{ width: 130 }}
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { label: "All Status", value: "all" },
                  { label: "Delivered", value: "delivered" },
                  { label: "Pending", value: "pending" },
                  { label: "Failed", value: "failed" },
                ]}
              />
              <Select
                placeholder="Type"
                style={{ width: 130 }}
                value={typeFilter}
                onChange={setTypeFilter}
                options={[
                  { label: "All Types", value: "all" },
                  { label: "Single", value: "single" },
                  { label: "Bulk", value: "bulk" },
                ]}
              />
            </div>
            <div className="flex gap-2">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleBulkDelete}
                disabled={selectedMessages.length === 0}
              >
                Delete Selected ({selectedMessages.length})
              </Button>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={filteredMessages}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} messages`,
            }}
            rowSelection={{
              selectedRowKeys: selectedMessages.map((m) => m.key),
              onChange: (_, selectedRows) => {
                setSelectedMessages(selectedRows);
              },
            }}
          />
        </CardContent>
      </Card>

      {/* View Message Modal */}
      <Modal
        title={<div className="text-xl font-semibold">Message Details</div>}
        open={viewModalOpen}
        onCancel={() => {
          setViewModalOpen(false);
          setSelectedMessage(null);
        }}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>,
          <Button
            key="resend"
            type="primary"
            icon={<SendOutlined />}
            onClick={() => message.info("Resend functionality coming soon")}
          >
            Resend Message
          </Button>,
        ]}
        width={700}
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Subject</div>
              <div className="text-lg font-semibold">
                {selectedMessage.subject}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Message</div>
              <div className="bg-gray-50 p-4 rounded-lg">
                {selectedMessage.message}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Sent Date</div>
                <div className="font-medium">{selectedMessage.sentDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Status</div>
                {renderStatus(selectedMessage.status)}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">
                Recipients ({selectedMessage.recipientCount})
              </div>
              {selectedMessage.type === "bulk" ? (
                <div className="bg-blue-50 p-3 rounded-lg text-blue-700">
                  This message was sent to {selectedMessage.recipientCount}{" "}
                  parents
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <Image
                    src={selectedMessage.sentTo[0]?.avatar || images.Unknown}
                    height={40}
                    width={40}
                    className="rounded-full"
                    alt={selectedMessage.sentTo[0]?.name || "recipient"}
                  />
                  <div>
                    <div className="font-medium">
                      {selectedMessage.sentTo[0]?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedMessage.sentTo[0]?.email}
                    </div>
                    <Tag color="blue" className="mt-1">
                      {selectedMessage.sentTo[0]?.relationship}
                    </Tag>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-red-600">
            <DeleteOutlined />
            <span>Confirm Delete</span>
          </div>
        }
        open={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          if (selectedMessages.length === 1) {
            setSelectedMessages([]);
          }
        }}
        onOk={confirmDelete}
        confirmLoading={deleteLoading}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete{" "}
          {selectedMessages.length === 1
            ? "this message"
            : `${selectedMessages.length} messages`}
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
