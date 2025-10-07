import React from "react";
import { Card, Row, Col } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  SecurityScanOutlined,
  FlagOutlined,
} from "@ant-design/icons";

interface UserStatsProps {
  users: User[];
}

const UserStats: React.FC<UserStatsProps> = ({ users }) => {
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    verified: users.filter((u) => u.verification === "verified").length,
    reported: users.filter((u) => u.reportsCount > 0).length,
  };

  const statCards = [
    {
      key: "total",
      title: "Total Users",
      value: stats.total,
      icon: TeamOutlined,
      iconBgColor: "bg-blue-400 dark:bg-blue-500",
      borderColor: "border-blue-200 dark:border-blue-800",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      key: "active",
      title: "Active Users",
      value: stats.active,
      icon: CheckCircleOutlined,
      iconBgColor: "bg-green-400 dark:bg-green-500",
      borderColor: "border-green-200 dark:border-green-800",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      key: "verified",
      title: "Verified Users",
      value: stats.verified,
      icon: SecurityScanOutlined,
      iconBgColor: "bg-purple-400 dark:bg-purple-500",
      borderColor: "border-purple-200 dark:border-purple-800",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      key: "reported",
      title: "Reported Users",
      value: stats.reported,
      icon: FlagOutlined,
      iconBgColor: "bg-orange-400 dark:bg-orange-500",
      borderColor: "border-orange-200 dark:border-orange-800",
      textColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <Row gutter={[20, 20]} className="mb-8">
      {statCards.map((stat) => {
        const IconComponent = stat.icon;

        return (
          <Col xs={24} sm={12} lg={6} key={stat.key}>
            <div
              className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border-2 ${stat.borderColor} shadow-md hover:shadow-xl dark:shadow-gray-900/30 dark:hover:shadow-gray-900/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
            >
              <div className="relative p-6">
                {/* Header with icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 ${stat.textColor}`}
                    >
                      {stat.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform duration-300">
                        {stat.value.toLocaleString()}
                      </h3>
                    </div>
                  </div>

                  {/* Floating icon with gradient */}
                  <div
                    className={`relative p-3 rounded-xl bg-gradient-to-br ${stat.iconBgColor} shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    <IconComponent className="!text-white text-lg" />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default UserStats;
