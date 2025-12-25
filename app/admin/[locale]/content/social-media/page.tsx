"use client";

import { useState } from "react";
import { Dropdown, MenuProps, Table, Button, Card, Spin, Tag } from "antd";
import { Plus, Edit, Trash2, Eye, EyeOff, Link as LinkIcon } from "lucide-react";
import { Header, StatsCard } from "@/components/admin/shared";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";
import usePutData from "@/hooks/usePutData";
import useDeleteData from "@/hooks/useDeleteData";
import { AddSocialMediaModal } from "./_components/AddSocialMediaModal";
import { EditSocialMediaModal } from "./_components/EditSocialMediaModal";
import StatusBadge from "@/components/shared/StatusBadge";
import Loader from "@/components/shared/Loader";

const SocialMediaPage = () => {
  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSocialMedia, setEditingSocialMedia] = useState<SocialMedia | null>(null);
  const [deletingSocialMedia, setDeletingSocialMedia] = useState<SocialMedia | null>(null);

  // API endpoints
  const API_ENDPOINT = "/api/admin/contact-links";

  // Hooks for CRUD operations
  const {
    data: socialMediaData,
    loading: isFetching,
    error: fetchError,
    refetch: refetchSocialMedia,
  } = useGetData<SocialMedia[]>({
    url: API_ENDPOINT,
    enabled: true,
  });

  const {
    postData: addSocialMedia,
    loading: isAdding,
    error: addError,
    validationErrors: addValidationErrors,
    reset: resetAdd,
  } = usePostData<SocialMedia>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "Contact link added successfully",
    errorMessage: "Failed to add contact link",
    onSuccess: () => {
      refetchSocialMedia();
      closeAddModal();
      resetAdd();
    },
  });

  const {
    putData: updateSocialMedia,
    loading: isUpdating,
    error: updateError,
    validationErrors: updateValidationErrors,
    reset: resetUpdate,
  } = usePutData<SocialMedia>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "Contact link updated successfully",
    errorMessage: "Failed to update contact link",
    onSuccess: () => {
      refetchSocialMedia();
      closeEditModal();
      resetUpdate();
    },
  });

  const {
    deleteData,
    handleDelete: openDeleteConfirm,
    confirmDelete,
    cancelDelete,
    loading: isDeleting,
    error: deleteError,
    isDeleteModalOpen: deleteHookModalOpen,
    selectedItem: deleteHookItem,
  } = useDeleteData<SocialMedia>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "Contact link deleted successfully",
    errorMessage: "Failed to delete contact link",
    onDeleteSuccess: () => {
      refetchSocialMedia();
      closeDeleteModal();
    },
  });

  // Modal handlers
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    resetAdd();
  };

  const openEditModal = (record: SocialMedia) => {
    setEditingSocialMedia(record);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSocialMedia(null);
    resetUpdate();
  };

  const openDeleteModal = (record: SocialMedia) => {
    setDeletingSocialMedia(record);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingSocialMedia(null);
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    if (deletingSocialMedia?.id) {
      await deleteData(deletingSocialMedia.id);
    }
  };

  // Handle add social media
  const handleAddSocialMedia = async (data: SocialMedia) => {
    await addSocialMedia(data);
  };

  // Handle edit social media
  const handleEditSocialMedia = async (data: FormData | SocialMedia, id: number) => {
    await updateSocialMedia(data, id.toString());
  };

  // Get type color
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      social: "blue",
      contact: "green", // Added contact type
      other: "gray",
    };
    return colors[type] || "default";
  };

  // Columns configuration
  const columns = [
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      width: 80,
      render: (icon: string) => (
        <div className="flex items-center justify-center">
          <div className="relative w-8 h-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${icon}`}
              alt={icon}
              className="object-contain"
              width={44}
              height={44}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: SocialMedia, b: SocialMedia) => a.name.localeCompare(b.name),
      render: (name: string) => <span className="font-medium">{name}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: string) => (
        <Tag color={getTypeColor(type)} className="capitalize">
          {type}
        </Tag>
      ),
    },
    {
      title: "URL",
      dataIndex: "value",
      key: "value",
      render: (url: string) => (
        <div className="flex items-center gap-2 max-w-xs">
          <LinkIcon className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline truncate text-sm"
            title={url}
          >
            {url}
          </a>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      width: 100,
      render: (is_active: boolean) => {
        const statusText = is_active ? "Active" : "Inactive";
        const statusVariant = is_active ? "active" : "inactive";
        
        return (
          <StatusBadge
            status={statusText}
            variant={statusVariant}
            showIcon={true}
            size="md"
            rounded="full"
            className="border-0"
          />
        );
      },
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      width: 120,
      sorter: (a: SocialMedia, b: SocialMedia) => 
        new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime(),
      render: (date: string) => (
        <span className="text-sm text-gray-500">
          {date ? new Date(date).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: any, record: SocialMedia) => {
        const menuItems: MenuProps["items"] = [
          {
            key: "edit",
            label: (
              <div className="flex items-center gap-2 px-1 py-1.5">
                <Edit className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600">Edit</span>
              </div>
            ),
            onClick: () => openEditModal(record),
          },
          {
            key: "delete",
            label: (
              <div className="flex items-center gap-2 px-1 py-1.5 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </div>
            ),
            onClick: () => openDeleteModal(record),
          },
        ];

        return (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <span
              className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              title="Actions"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.currentTarget.click();
                }
              }}
            >
              <MoreHorizontal className="w-4 h-4" />
            </span>
          </Dropdown>
        );
      },
    },
  ];

  // Filter data for statistics
  const activeCount = socialMediaData?.filter(item => item.is_active)?.length || 0;
  const inactiveCount = socialMediaData?.filter(item => !item.is_active)?.length || 0;
  const totalCount = socialMediaData?.length || 0;

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto space-y-6 pb-24 sidebar-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Header
          title="Contact Links Management"
          description="Add, edit and delete social media and contact links"
        />
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          size="large"
          onClick={openAddModal}
          loading={isAdding}
        >
          Add Link
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          icon={LinkIcon}
          title="Total Links"
          value={totalCount}
          iconBgColor="from-blue-500 to-blue-600"
          borderColor="border-blue-200 dark:border-blue-800"
          description="All contact links"
        />
        
        <StatsCard
          icon={Eye}
          title="Active Links"
          value={activeCount}
          iconBgColor="from-green-500 to-green-600"
          borderColor="border-green-200 dark:border-green-800"
          description="Currently active links"
        />
        
        <StatsCard
          icon={EyeOff}
          title="Inactive Links"
          value={inactiveCount}
          iconBgColor="from-red-500 to-red-600"
          borderColor="border-red-200 dark:border-red-800"
          description="Currently inactive links"
        />
      </div>

      {/* Social Media Table */}
      <Card>
        {isFetching ? (
          // Using the Loader component instead of antd Spin
          <div className="flex justify-center items-center p-12">
            <Loader
            />
          </div>
        ) : fetchError ? (
          <div className="flex justify-center items-center p-8">
            <div className="text-red-500 text-center">
              <p>Failed to load contact links: {fetchError}</p>
              <Button type="link" onClick={refetchSocialMedia} className="mt-2">
                Try Again
              </Button>
            </div>
          </div>
        ) : socialMediaData?.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <LinkIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No contact links yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first contact link</p>
            <Button
              type="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={openAddModal}
              loading={isAdding}
            >
              Add First Link
            </Button>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={socialMediaData || []}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} links`,
            }}
            size="middle"
            scroll={{ x: 1000 }}
          />
        )}
      </Card>

      {/* Add Social Media Modal */}
      {isAddModalOpen && (
        <AddSocialMediaModal
          open={isAddModalOpen}
          onClose={closeAddModal}
          onAddSocialMedia={handleAddSocialMedia}
          isLoading={isAdding}
        />
      )}

      {/* Edit Social Media Modal */}
      {isEditModalOpen && (
        <EditSocialMediaModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          onEditSocialMedia={handleEditSocialMedia}
          isLoading={isUpdating}
          editingSocialMedia={editingSocialMedia}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
          isLoading={isDeleting}
          itemName={deletingSocialMedia?.name || "this contact link"}
          description="This will permanently remove the contact link from the system."
        />
      )}
    </div>
  );
};

export default SocialMediaPage;