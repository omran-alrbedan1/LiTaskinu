import React from "react";
import { Card, Row, Col, Input, Select, Button, Space, Tag } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { STATUS_OPTIONS, VERIFICATION_OPTIONS } from "@/config/admin";

const { Search } = Input;
const { Option } = Select;

interface Filters {
  status: string;
  verification: string;
  search: string;
  page: string;
  pageSize: string;
}

interface UserFiltersProps {
  searchText: string;
  filters: Filters;
  onSearch: (value: string) => void;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onClearFilters: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchText,
  filters,
  onSearch,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = Boolean(
    filters.status || filters.verification || filters.search
  );

  const activeFiltersCount = [
    filters.status && "Status",
    filters.verification && "Verification",
    filters.search && "Search",
  ].filter(Boolean).length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleSearch = (value: string) => {
    onSearch(value);
  };

  const clearFilter = (filterKey: keyof Filters) => {
    onFilterChange(filterKey, "");
  };

  return (
    <Card className="mb-6 border-0 rounded-xl shadow-sm">
      <Row gutter={[16, 16]} align="middle">
        {/* Search Input */}
        <Col xs={24} lg={8}>
          <Search
            placeholder="Search users by name, email, or phone..."
            allowClear
            enterButton={<SearchOutlined className="text-white" />}
            size="large"
            value={searchText}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            className="w-full"
          />
        </Col>

        {/* Filters */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]} justify="end">
            {/* Status Filter */}
            <Col xs={12} sm={8} md={6}>
              <Select
                placeholder="Status"
                className="w-full"
                size="large"
                value={filters.status || undefined}
                onChange={(value) => onFilterChange("status", value)}
                allowClear
                suffixIcon={<FilterOutlined />}
              >
                {STATUS_OPTIONS.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Col>

            {/* Verification Filter */}
            <Col xs={12} sm={8} md={6}>
              <Select
                placeholder="Verification"
                className="w-full"
                size="large"
                value={filters.verification || undefined}
                onChange={(value) => onFilterChange("verification", value)}
                allowClear
                suffixIcon={<CheckCircleOutlined />}
              >
                {VERIFICATION_OPTIONS.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Col>

            {/* Actions */}
            <Col xs={24} sm={8} md={6}>
              <Space size="middle" wrap>
                {hasActiveFilters && (
                  <>
                    <Button
                      icon={<ReloadOutlined />}
                      onClick={onClearFilters}
                      size="large"
                      className="min-w-32"
                    >
                      Clear All
                    </Button>
                  </>
                )}
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Space wrap size="small">
            {filters.status && (
              <Tag
                closable
                onClose={() => clearFilter("status")}
                closeIcon={<CloseOutlined className="text-xs" />}
                color="blue"
                className="py-1 px-3"
              >
                Status:{" "}
                {STATUS_OPTIONS.find((s) => s.value === filters.status)
                  ?.label || filters.status}
              </Tag>
            )}

            {filters.verification && (
              <Tag
                closable
                onClose={() => clearFilter("verification")}
                closeIcon={<CloseOutlined className="text-xs" />}
                color="green"
                className="py-1 px-3"
              >
                Verification:{" "}
                {VERIFICATION_OPTIONS.find(
                  (v) => v.value === filters.verification
                )?.label || filters.verification}
              </Tag>
            )}

            {filters.search && (
              <Tag
                closable
                onClose={() => clearFilter("search")}
                closeIcon={<CloseOutlined className="text-xs" />}
                color="purple"
                className="py-1 px-3"
              >
                Search: "{filters.search}"
              </Tag>
            )}
          </Space>
        </div>
      )}
    </Card>
  );
};

export default UserFilters;
