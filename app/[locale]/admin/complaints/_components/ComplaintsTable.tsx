"use client";
import React from "react";
import { Table, Tag, Button, Dropdown } from "antd";
import {
  EyeOutlined,
  MoreOutlined,
  BlockOutlined,
  WarningOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { complaintTypeConfig, getComplaintConfig } from "@/configs/complaints";

// Define types to match your data structure
interface User {
  name: string;
  email: string;
}

interface Complaint {
  id: string;
  reporter: User;
  reportedUser: User;
  type: keyof typeof complaintTypeConfig;
  date: string;
  status: "pending" | "resolved" | "rejected";
  chatId?: string;
  messages?: any[];
}

interface ActionHandlers {
  onView: (complaint: Complaint) => void;
  onBan: (complaint: Complaint) => void;
  onWarn: (complaint: Complaint) => void;
  onDelete: (complaint: Complaint) => void;
}

interface ComplaintsTableProps {
  data: Complaint[];
  loading?: boolean;
  actionHandlers: ActionHandlers;
}

const ComplaintsTable: React.FC<ComplaintsTableProps> = ({
  data,
  loading = false,
  actionHandlers,
}) => {
  const statusConfig = {
    pending: { color: "orange", text: "Under Review" },
    resolved: { color: "green", text: "Resolved" },
    rejected: { color: "red", text: "Rejected" },
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id: string) => <span className="font-mono">#{id}</span>,
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      key: "reporter",
      render: (reporter: User, record: Complaint) => (
        <div>
          <div className="font-medium">{reporter.name}</div>
          <div className="text-xs text-gray-500">{record.reporter.email}</div>
        </div>
      ),
    },
    {
      title: "Reported User",
      dataIndex: "reportedUser",
      key: "reportedUser",
      render: (reportedUser: User, record: Complaint) => (
        <div>
          <div className="font-medium">{reportedUser.name}</div>
          <div className="text-xs text-gray-500">
            {record.reportedUser.email}
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: keyof typeof complaintTypeConfig) => {
        const config = complaintTypeConfig[type];
        const IconComponent = config.icon;
        return (
          <Tag
            color={config.color}
            style={{ color: config.textColor }}
            icon={<IconComponent />}
            className="flex items-center gap-1"
          >
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof statusConfig) => {
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: Complaint) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: (
                  <div
                    className="flex items-center"
                    onClick={() => actionHandlers.onView(record)}
                  >
                    <EyeOutlined className="mr-2 !text-blue-600" />
                    View Details
                  </div>
                ),
              },
              {
                key: "ban",
                label: (
                  <div
                    className="flex items-center"
                    onClick={() => actionHandlers.onBan(record)}
                  >
                    <BlockOutlined className="mr-2  !text-red-600" />
                    Ban User
                  </div>
                ),
              },
              {
                key: "warn",
                label: (
                  <div
                    className="flex items-center "
                    onClick={() => actionHandlers.onWarn(record)}
                  >
                    <WarningOutlined className="mr-2 !text-orange-600" />
                    Send Warning
                  </div>
                ),
              },
              { type: "divider" },
              {
                key: "delete",
                label: (
                  <div
                    className="flex items-center text-red-600"
                    onClick={() => actionHandlers.onDelete(record)}
                  >
                    <DeleteOutlined className="mr-2" />
                    Delete Complaint
                  </div>
                ),
                danger: true,
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      scroll={{ x: 1000 }}
    />
  );
};

export default ComplaintsTable;
