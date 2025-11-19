import React from "react";
import { Card, Row, Col, Input, Select, Button, Space } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

interface UserFiltersProps {
  searchText: string;
  filters: {
    status: string;
    verification: string;
    dateRange: any[];
  };
  onSearch: (value: string) => void;
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchText,
  filters,
  onSearch,
  onFilterChange,
  onClearFilters,
  onApplyFilters,
}) => {
  const hasActiveFilters =
    filters?.status || filters?.verification || searchText;

  return (
    <Card className="mb-24  border-0 rounded-xl">
      <Row gutter={[16, 16]} align="middle" className="">
        <Col xs={24} lg={8} className="-mr-24">
          <Search
            placeholder="Search users by name, email, or phone..."
            allowClear
            enterButton={<SearchOutlined className="text-white" />}
            size="large"
            onSearch={onSearch}
            onChange={(e) => onSearch(e.target.value)}
            value={searchText}
            className="max-w-md"
          />
        </Col>
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]} justify="end">
            <Col xs={12} sm={8} md={6}>
              <Select
                placeholder="Status"
                style={{ width: "100%" }}
                size="large"
                value={filters?.status || undefined}
                onChange={(value) => onFilterChange("status", value)}
                allowClear
                suffixIcon={<FilterOutlined />}
              >
                <Option value="active">Active</Option>
                <Option value="pending">Pending</Option>
                <Option value="banned">Banned</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Select
                placeholder="Verification"
                style={{ width: "100%" }}
                size="large"
                value={filters?.verification || undefined}
                onChange={(value) => onFilterChange("verification", value)}
                allowClear
                suffixIcon={<CheckCircleOutlined />}
              >
                <Option value="verified">Verified</Option>
                <Option value="pending">Pending</Option>
                <Option value="unverified">Unverified</Option>
              </Select>
            </Col>

            <Col xs={24} sm={8} md={6}>
              <Space size="middle">
                <Button
                  icon={<FilterOutlined />}
                  type={hasActiveFilters ? "primary" : "default"}
                  onClick={onApplyFilters}
                  size="large"
                  className="w-32"
                >
                  Apply
                </Button>
                {hasActiveFilters && (
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={onClearFilters}
                    size="large"
                  >
                    Clear
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default UserFilters;
