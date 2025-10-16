"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, Input, Table, Tag, Dropdown, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  DeleteOutlined,
  MessageOutlined,
  MoreOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Users, UserCheck, UserX, UserCog } from "lucide-react";
import { Header, StatsCard } from "@/components/admin/shared";
import { DeleteModal, MessageModal } from "./_components";
import { MOCK_PARENTS } from "@/constants/temporary";
import Image from "next/image";
import { images } from "@/constants/images";

// Main Component
export default function ParentManagementPage() {
  const [parents, setParents] = useState<ParentType[]>(MOCK_PARENTS);
  const [selectedParents, setSelectedParents] = useState<ParentType[]>([]);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isBulkMessageModalOpen, setIsBulkMessageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [bulkMessageLoading, setBulkMessageLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Calculate statistics
  const totalParents = parents.length;
  const fathersCount = parents.filter(
    (p) => p.parent.relationship === "Father"
  ).length;
  const mothersCount = parents.filter(
    (p) => p.parent.relationship === "Mother"
  ).length;
  const othersCount = parents.filter(
    (p) =>
      p.parent.relationship === "Brother" ||
      p.parent.relationship === "Guardian"
  ).length;

  // Get selected parent keys
  const selectedParentKeys = selectedParents.map((parent) => parent.key);

  // Filtered parents for search
  const filteredParents = parents.filter((parent) => {
    return (
      parent.parent.name.toLowerCase().includes(searchText.toLowerCase()) ||
      parent.member.name.toLowerCase().includes(searchText.toLowerCase()) ||
      parent.parent.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  // Handle single message
  const handleSendMessage = (parent: ParentType) => {
    setSelectedParents([parent]);
    setIsMessageModalOpen(true);
  };

  // Handle bulk message
  const handleBulkMessage = () => {
    setIsBulkMessageModalOpen(true);
  };

  // Handle single delete
  const handleDeleteParent = (parent: ParentType) => {
    setSelectedParents([parent]);
    setIsDeleteModalOpen(true);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedParents.length === 0) {
      message.warning("Please select parents to delete");
      return;
    }
    setIsBulkDeleteModalOpen(true);
  };

  // Confirm delete (single or bulk)
  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setParents(
        parents.filter((parent) => !selectedParentKeys.includes(parent.key))
      );
      setSelectedParents([]);

      const successMessage =
        selectedParents.length === 1
          ? "Parent deleted successfully"
          : `${selectedParents.length} parents deleted successfully`;

      message.success(successMessage);

      // Close modals
      setIsDeleteModalOpen(false);
      setIsBulkDeleteModalOpen(false);
    } catch (error) {
      message.error("Error occurred while deleting");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Message send handlers - UPDATED FOR NEW MESSAGEMODAL
  const onMessageSend = async (values: {
    subject: string;
    message: string;
  }) => {
    setMessageLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const parentName = selectedParents[0]?.parent.name || "parent";
      message.success(`Message sent to ${parentName} successfully`);
      setIsMessageModalOpen(false);
      setSelectedParents([]);
    } catch (error) {
      message.error("Error occurred while sending message");
    } finally {
      setMessageLoading(false);
    }
  };

  const onBulkMessageSend = async (values: {
    subject: string;
    message: string;
  }) => {
    setBulkMessageLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success(`Message sent to ${selectedParents.length} parents`);
      setIsBulkMessageModalOpen(false);
    } catch (error) {
      message.error("Error occurred while sending messages");
    } finally {
      setBulkMessageLoading(false);
    }
  };

  // Handle message to all parents
  const handleMessageAll = () => {
    setSelectedParents(parents); // Select all parents
    setIsBulkMessageModalOpen(true);
  };

  // Table columns
  const columns: ColumnsType<ParentType> = [
    {
      title: "Parent",
      dataIndex: "parent",
      key: "parent",
      render: (parent: ParentType["parent"]) => (
        <div className="flex items-center gap-3">
          <Image
            src={parent.avatar || images.Unknown}
            height={44}
            width={44}
            className="rounded-full"
            alt={parent.email}
          />
          <div>
            <div className="font-medium">{parent.name}</div>
            <div className="text-xs text-gray-500">{parent.email}</div>
            <div className="text-xs text-gray-400">{parent.phone}</div>
            <Tag color="blue" className="mt-1">
              {parent.relationship}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Member",
      dataIndex: "member",
      key: "member",
      render: (member: ParentType["member"]) => (
        <div className="flex items-center gap-3">
          <Image
            src={member.avatar || images.Unknown}
            height={44}
            width={44}
            className="rounded-full"
            alt={member.avatar || "alt"}
          />
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-xs text-gray-500">{member.age} years</div>
            <div className="text-xs text-gray-400">{member.maritalStatus}</div>
            <div className="text-xs text-green-500">{member.education}</div>
          </div>
        </div>
      ),
    },
    {
      title: "City",
      dataIndex: ["contact", "city"],
      key: "city",
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
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
                    <EyeOutlined className="ml-2" />
                    View Details
                  </div>
                ),
              },
              {
                key: "sendMessage",
                label: (
                  <div className="flex items-center text-blue-600">
                    <MessageOutlined className="ml-2" />
                    Send Message
                  </div>
                ),
                onClick: () => handleSendMessage(record),
              },
              {
                type: "divider",
              },
              {
                key: "delete",
                label: (
                  <div className="flex items-center text-red-600">
                    <DeleteOutlined className="ml-2" />
                    Delete
                  </div>
                ),
                onClick: () => handleDeleteParent(record),
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
      <div className="flex justify-between items-center">
        <Header
          title="Parent Management"
          description="Manage and organize parent data for members in the Islamic Marriage
            Platform"
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          icon={Users}
          title="Total Parents"
          value={totalParents}
          description="Registered in system"
          iconBgColor="from-blue-500 to-blue-600"
        />
        <StatsCard
          icon={UserCheck}
          title="Fathers"
          value={fathersCount}
          description="Father"
          iconBgColor="from-green-500 to-green-600"
        />
        <StatsCard
          icon={UserCog}
          title="Mothers"
          value={mothersCount}
          description="Mother"
          iconBgColor="from-purple-500 to-purple-600"
        />
        <StatsCard
          icon={UserX}
          title="Brother/Guardian"
          value={othersCount}
          description="Brother or Guardian"
          iconBgColor="from-orange-500 to-orange-600"
        />
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle>Parents List</CardTitle>
          <CardDescription>
            All member parents registered in the Islamic Marriage Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Actions */}
          <div className="flex justify-between items-center mb-12 ">
            <div className="flex gap-2">
              <Input
                placeholder="Search by parent name or member..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
              <Button icon={<FilterOutlined />}>Filter</Button>
            </div>
            <div className="flex gap-2">
              <Button
                danger
                icon={<DeleteOutlined />}
                size="large"
                onClick={handleBulkDelete}
                disabled={selectedParents.length === 0}
                className="hover:shadow-lg transition-all duration-300"
              >
                Delete Selected ({selectedParents.length})
              </Button>
              <Button
                type="primary"
                icon={<UsergroupAddOutlined />}
                size="large"
                onClick={handleBulkMessage}
                disabled={selectedParents.length === 0}
                className="hover:shadow-lg transition-all duration-300"
              >
                Bulk Message ({selectedParents.length})
              </Button>
              <Button
                type="primary"
                icon={<MessageOutlined />}
                size="large"
                onClick={handleMessageAll}
                className="hover:shadow-lg transition-all duration-300"
              >
                Message All
              </Button>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={filteredParents}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} parents`,
            }}
            rowSelection={{
              selectedRowKeys: selectedParentKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectedParents(selectedRows);
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Single Message Modal - UPDATED USAGE */}
      <MessageModal
        open={isMessageModalOpen}
        onCancel={() => {
          setIsMessageModalOpen(false);
          setSelectedParents([]);
        }}
        onSend={onMessageSend}
        selectedParents={selectedParents}
        title="Send Message to Parent"
        loading={messageLoading}
      />

      {/* Bulk Message Modal - UPDATED USAGE */}
      <MessageModal
        open={isBulkMessageModalOpen}
        onCancel={() => {
          setIsBulkMessageModalOpen(false);
        }}
        onSend={onBulkMessageSend}
        selectedParents={selectedParents}
        isBulk={true}
        title="Send Bulk Message"
        loading={bulkMessageLoading}
      />

      {/* Single Delete Modal */}
      <DeleteModal
        open={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setSelectedParents([]);
        }}
        onConfirm={confirmDelete}
        selectedParents={selectedParents}
        loading={deleteLoading}
      />

      {/* Bulk Delete Modal */}
      <DeleteModal
        open={isBulkDeleteModalOpen}
        onCancel={() => {
          setIsBulkDeleteModalOpen(false);
        }}
        onConfirm={confirmDelete}
        selectedParents={selectedParents}
        isBulk={true}
        loading={deleteLoading}
      />
    </div>
  );
}
