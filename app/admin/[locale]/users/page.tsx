"use client";
import React, { useMemo, useState } from "react";
import { Card } from "antd";
import { UserFilters, UserStats, UserTable } from "./_components";
import { BanModal, Header } from "@/components/admin/shared";
import useGetData from "@/hooks/useGetData";
import useDeleteData from "@/hooks/useDeleteData";
import DeleteModal from "@/components/admin/shared/DeleteModal";

import { useUserFilters } from "@/hooks/useUserFilters";
import { buildURL } from "./helper";

const UserManagementPage: React.FC = () => {
  const {
    filters,
    searchText,
    updateFilter,
    handleSearch,
    handlePaginationChange,
    clearFilters,
  } = useUserFilters();

  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [selectedUserForBan, setSelectedUserForBan] = useState<any>(null);

  // delete user :
  const {
    handleDelete,
    confirmDelete,
    cancelDelete,
    loading: isDeletingUser,
    isDeleteModalOpen,
    selectedItem,
  } = useDeleteData("/api/admin/users", {
    showNotifications: true,
    successMessage: "User deleted successfully!",
    errorMessage: "Failed to delete user",
    autoRefetch: true,
    onSuccess: () => {
      refetchUsersList();
    },
  });

  const selectedItemName = selectedItem
    ? `${(selectedItem as any).first_name} ${(selectedItem as any).last_name}`
    : "this user";

  // fetch users :
  const usersUrl = useMemo(() => buildURL(filters), [filters]);

  const {
    data: usersResponse,
    loading: isFetchingUsersList,
    refetch: refetchUsersList,
  } = useGetData({
    url: usersUrl,
    enabled: !!usersUrl,
  });

  // Ban modal handlers
  const openBanModal = (user: any) => {
    setSelectedUserForBan(user);
    setIsBanModalOpen(true);
  };

  const closeBanModal = () => {
    setIsBanModalOpen(false);
    setSelectedUserForBan(null);
  };

  const handleBanSuccess = () => {
    refetchUsersList();
    closeBanModal();
  };

  return (
    <div className="mx-auto pb-24 p-8 max-h-[90vh] md:overflow-x-clip sidebar-scrollbar overflow-auto">
      <div className="mb-6">
        <Header
          title="User Management"
          description="Manage users, verifications, and monitor platform activity"
        />
      </div>

      {usersResponse?.data && <UserStats users={usersResponse.data} />}

      <UserFilters
        searchText={searchText}
        filters={filters}
        onSearch={handleSearch}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
      />

      <Card className="shadow-sm !mt-4 dark:border-1 dark:!-mt-20">
        <UserTable
          users={usersResponse?.data || []}
          loading={isFetchingUsersList}
          searchText={searchText}
          pagination={usersResponse?.pagination}
          onPaginationChange={handlePaginationChange}
          currentFilters={filters}
          onDeleteUser={handleDelete}
          onBanUser={openBanModal}
        />
      </Card>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isLoading={isDeletingUser}
        itemName={selectedItemName}
        description="This will permanently remove the user and all associated data from the system."
      />

      {/* Ban Modal */}
      <BanModal
        open={isBanModalOpen}
        onCancel={closeBanModal}
        user={selectedUserForBan}
        onSuccess={handleBanSuccess}
      />
    </div>
  );
};

export default UserManagementPage;
