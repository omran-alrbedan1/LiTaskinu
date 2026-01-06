import React from "react";
import { Card, Row, Col } from "antd";
import {
  ExclamationCircleOutlined,
  FileTextOutlined,
  FilterOutlined,
} from "@ant-design/icons";

interface StatisticsCardsProps {
  pendingCount?: number;
  monthlyCount?: number;
  mostCommonType?: string;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  pendingCount = 12,
  monthlyCount = 45,
  mostCommonType = "Harassment (40%)",
}) => {
  return (
    <Row gutter={16} className="mt-4">
      <Col xs={24} sm={8}>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl font-bold text-orange-500">
            {pendingCount}
          </div>
          <div className="text-gray-600 flex items-center justify-center">
            <ExclamationCircleOutlined className="mr-2" />
            Pending Complaints
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl font-bold text-blue-500">{monthlyCount}</div>
          <div className="text-gray-600 flex items-center justify-center">
            <FileTextOutlined className="mr-2" />
            This Month
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <div className="text-xl font-bold text-green-500">
            {mostCommonType}
          </div>
          <div className="text-gray-600 flex items-center justify-center">
            <FilterOutlined className="mr-2" />
            Most Common Type
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsCards;
