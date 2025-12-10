import React, { useState } from "react";
import { Table, Space, Dropdown, Button, MenuProps, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";
import Image from "next/image";
import { images } from "@/constants/images";
import { StatusBadge, VerificationBadge } from ".";
import {
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  MoreOutlined,
  EyeOutlined,
  MailFilled,
  CheckCircleOutlined,
  UnlockOutlined,
  BlockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ICONS } from "@/constants/icons";
import { useRouter } from "next/navigation";
import { EmailModal, VerifyModal, UnbanModal } from ".";

interface UserTableProps {
  users: User[];
  loading: boolean;
  searchText: string;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
  };
  onPaginationChange: (page: number, pageSize: number) => void;
  currentFilters: any;
  onDeleteUser: (user: User) => void;
  onBanUser: (user: User) => void; // Add ban handler prop
  onEditUser?: (user: User) => void;
}

type ModalType = "email" | "verify" | "unban"; // Remove "ban" from here

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  pagination,
  onPaginationChange,
  currentFilters,
  onDeleteUser,
  onBanUser, // Receive ban handler
  onEditUser,
}) => {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current && pagination.pageSize) {
      onPaginationChange(pagination.current, pagination.pageSize);
    }
  };

  // Modal handlers
  const openModal = (modalType: ModalType, user: User) => {
    setSelectedUser(user);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedUser(null);
  };

  const handleSuccess = (action: string) => {
    message.success(`User ${action} successfully`);
    closeModal();
  };

  const handleViewUser = (user: User) => {
    router.push(`./users/${user.id}`);
  };

  // Handle ban action - call parent's ban handler
  const handleBanUser = (user: User) => {
    onBanUser(user);
  };

  const getActionMenuItems = (record: User): MenuProps["items"] => {
    const baseItems: MenuProps["items"] = [
      {
        key: "view",
        label: "View Profile",
        icon: <EyeOutlined className="!text-blue-500" />,
        onClick: () => handleViewUser(record),
      },
      {
        key: "send-email",
        label: "Send Email",
        icon: <MailFilled className="!text-purple-500" />,
        onClick: () => openModal("email", record),
      },
      { type: "divider" },
    ];

    const statusItems: MenuProps["items"] = [];

    if (record.verification !== "verified") {
      statusItems.push({
        key: "verify",
        label: "Verify User",
        icon: <CheckCircleOutlined className="text-green-500" />,
        onClick: () => openModal("verify", record),
      });
    }

    if (record.status === "banned") {
      statusItems.push({
        key: "unban",
        label: "Unban User",
        icon: <UnlockOutlined className="text-blue-500" />,
        onClick: () => openModal("unban", record),
      });
    } else {
      statusItems.push({
        key: "ban",
        label: "Ban User",
        icon: <BlockOutlined className="text-orange-500" />,
        onClick: () => handleBanUser(record), // Use the new ban handler
      });
    }

    const dangerItems: MenuProps["items"] = [
      { type: "divider" },
      {
        key: "delete",
        label: "Delete User",
        icon: <DeleteOutlined className="!text-red-500" />,
        onClick: () => onDeleteUser(record),
      },
    ];

    return [...baseItems, ...statusItems, ...dangerItems];
  };

  const columns: ColumnsType<User> = [
    // ... your existing columns remain the same
    {
      title: "USER",
      dataIndex: "first_name",
      key: "name",
      sorter: true,
      render: (_, record) => (
        <Space align="center">
          <Image
            src={images.Unknown}
            height={55}
            width={55}
            alt={"avatar"}
            className="rounded-full"
          />
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-gray-900 text-base truncate">
              {`${record.first_name} ${record.last_name}`}
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <MailOutlined className="text-xs !text-primary-color1" />
              <span className="truncate">{record.email}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <PhoneOutlined className="text-xs !text-primary-color1" />
              <span>{record.phone || "No phone"}</span>
            </div>
          </div>
        </Space>
      ),
      width: 280,
    },
    {
      title: "Status",
      dataIndex: "account_status",
      key: "status",
      render: (status: string) => <StatusBadge status={status} />,
      width: 140,
    },
    {
      title: "Verification",
      dataIndex: "is_verified",
      key: "verification",
      render: (is_verified: number) => (
        <VerificationBadge is_verified={is_verified} />
      ),
      width: 140,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => (
        <span className="capitalize">
          {gender == "male" ? (
            <div className="flex gap-1">
              <Image src={ICONS.male} width={18} height={14} alt="male" />
              <span className="">{gender}</span>
            </div>
          ) : (
            <div className="flex gap-1">
              <Image src={ICONS.female} width={18} height={14} alt="female" />
              <span>{gender}</span>
            </div>
          )}
        </span>
      ),
      width: 100,
    },
    {
      title: "Registration",
      dataIndex: "created_at",
      key: "registrationDate",
      sorter: true,
      render: (date: string) => (
        <div className="flex items-center gap-2 text-sm">
          <CalendarOutlined className="!text-blue-500" />
          <div>
            <div className="font-medium">
              {dayjs(date).format("MMM D, YYYY")}
            </div>
            <div className="text-gray-400 text-xs">
              {dayjs(date).format("h:mm A")}
            </div>
          </div>
        </div>
      ),
      width: 160,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionMenuItems(record) }}
          trigger={["click"]}
          placement="bottomRight"
          arrow
        >
          <Button
            icon={<MoreOutlined />}
            size="small"
            className="flex items-center justify-center border-gray-300 dark:border-gray-600"
            style={{ width: 32, height: 32 }}
          />
        </Dropdown>
      ),
      width: 80,
    },
  ];

  const tablePagination: TablePaginationConfig = {
    current: pagination?.current || parseInt(currentFilters.page) || 1,
    pageSize: pagination?.pageSize || parseInt(currentFilters.pageSize) || 10,
    total: pagination?.total || 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        onChange={handleTableChange}
        pagination={tablePagination}
        scroll={{ x: 1000 }}
        rowKey="id"
      />

      {/* Render Modals (without BanModal) */}
      {selectedUser && (
        <>
          <EmailModal
            open={activeModal === "email"}
            onCancel={closeModal}
            user={selectedUser}
            onSuccess={handleSuccess}
          />

          <VerifyModal
            open={activeModal === "verify"}
            onCancel={closeModal}
            onConfirm={() => handleSuccess("verified")}
            userName={selectedUser.name}
          />

          <UnbanModal
            open={activeModal === "unban"}
            onCancel={closeModal}
            onConfirm={() => handleSuccess("unbanned")}
            userName={selectedUser.name}
            confirmButtonColor="primary"
          />
        </>
      )}
    </>
  );
};

export default UserTable;
