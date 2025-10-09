import React from "react";
import { Table, Space, Modal } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";
import Image from "next/image";
import { images } from "@/constants/images";
import { StatusBadge, VerificationBadge, ActivityStats, UserActions } from ".";
import {
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

interface UserTableProps {
  users: User[];
  loading: boolean;
  searchText: string;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  searchText,
}) => {
  const [tableParams, setTableParams] = React.useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: users.length,
    },
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => {
    setTableParams({
      pagination: {
        ...pagination,
        total: users.length,
      } as any,
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: "USER",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, record) => (
        <Space align="center">
          <Image
            src={record.avatar || images.Unknown}
            height={55}
            width={55}
            alt={"avatar"}
            className="rounded-full"
          />
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-gray-900 text-base truncate">
              {name}
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <MailOutlined className="text-xs" />
              <span className="truncate">{record.email}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <PhoneOutlined className="text-xs" />
              <span>{record.phone}</span>
            </div>
          </div>
        </Space>
      ),
      width: 280,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <StatusBadge status={status} />,
      width: 140,
    },
    {
      title: "Verification",
      dataIndex: "verification",
      key: "verification",
      render: (verification: string) => (
        <VerificationBadge verification={verification} />
      ),
      width: 140,
    },
    {
      title: "Activity",
      key: "stats",
      render: (_, record) => <ActivityStats user={record} />,
      width: 200,
    },
    {
      title: "Registration",
      dataIndex: "registrationDate",
      key: "registrationDate",
      sorter: (a, b) =>
        dayjs(a.registrationDate).unix() - dayjs(b.registrationDate).unix(),
      render: (date: string) => (
        <div className="flex items-center gap-2 text-sm">
          <CalendarOutlined className="text-gray-400" />
          <div>
            <div className="font-medium ">
              {dayjs(date).format("MMM D, YYYY")}
            </div>
          </div>
        </div>
      ),
      width: 160,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => <UserActions user={record} />,
      width: 80,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      onChange={handleTableChange}
      pagination={{
        ...tableParams.pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} users`,
      }}
      scroll={{ x: 1000 }}
      rowKey="id"
    />
  );
};

export default UserTable;
