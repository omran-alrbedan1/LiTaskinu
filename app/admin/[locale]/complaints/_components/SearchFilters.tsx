import React from "react";
import { Card, Input, Select } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

interface SearchFiltersProps {
  onSearch?: (value: string) => void;
  onTypeFilter?: (value: string) => void;
  onStatusFilter?: (value: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onTypeFilter,
  onStatusFilter,
}) => {
  return (
    <Card className="!my-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <Search
          placeholder="Search by complaint ID, user name, or email..."
          enterButton={<SearchOutlined />}
          size="large"
          className="flex-1"
          onSearch={onSearch}
        />
        <Select
          placeholder="Type"
          size="large"
          className="min-w-[150px]"
          suffixIcon={<FilterOutlined />}
          onChange={onTypeFilter}
        >
          <Option value="">All Types</Option>
          <Option value="harassment">Harassment</Option>
          <Option value="inappropriate">Inappropriate Content</Option>
          <Option value="fake">Fake Profile</Option>
          <Option value="spam">Spam</Option>
          <Option value="other">Other</Option>
        </Select>
        <Select
          placeholder="Status"
          size="large"
          className="min-w-[150px]"
          onChange={onStatusFilter}
        >
          <Option value="pending">Pending</Option>
          <Option value="resolved">Resolved</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
      </div>
    </Card>
  );
};

export default SearchFilters;
