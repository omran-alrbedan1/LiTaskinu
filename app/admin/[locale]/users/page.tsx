//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { Card, Row, Col, message } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { sampleUsers } from "@/constants/admin";
import { UserStats, UserFilters, UserTable } from "./_components";
import { Header } from "@/components/admin/shared";

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    verification: "",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers(sampleUsers);
    } catch (error) {
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      verification: "",
    });
    setSearchText("");
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone.includes(searchText);
    const matchesStatus = !filters.status || user.status === filters.status;
    const matchesVerification =
      !filters.verification || user.verification === filters.verification;

    return matchesSearch && matchesStatus && matchesVerification;
  });

  return (
    <div className="mx-auto pb-24 p-2  max-h-screen sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <Header
          title="User Management"
          description={`  Manage ${users.length} users, verifications, and monitor platform
              activity`}
        />
      </div>

      {/* Stats Cards */}
      <UserStats users={users} />

      {/* Filters Card */}
      <UserFilters
        searchText={searchText}
        filters={filters}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        onApplyFilters={fetchUsers}
      />

      {/* Users Table */}
      <Card className="shadow-sm !mt-4 border-0">
        <UserTable
          users={filteredUsers}
          loading={loading}
          searchText={searchText}
        />
      </Card>
    </div>
  );
};

export default UserManagementPage;
