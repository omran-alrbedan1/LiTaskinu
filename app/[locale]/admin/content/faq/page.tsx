"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header, StatsCard } from "@/components/admin/shared";
import { Plus, HelpCircle } from "lucide-react";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { AddFAQModal } from "./_components/AddFAQModal";
import { EditFAQModal } from "./_components/EditFAQModal";
import { FAQCard } from "./_components/FAQCard";
import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";
import usePutData from "@/hooks/usePutData";
import useDeleteData from "@/hooks/useDeleteData";
import { EmptyState } from "@/components/shared";
import Loader from "@/components/shared/Loader";
import { images } from "@/constants/images";


const FAQPage = () => {
  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [deletingFAQ, setDeletingFAQ] = useState<FAQ | null>(null);
  
  // API endpoint
  const API_ENDPOINT = "/api/admin/frequently-question";

  // Fetch FAQs
  const {
    data: faqsData,
    loading: isFetching,
    error: fetchError,
    refetch: refetchFAQs,
  } = useGetData<{ data: FAQ[] }>({
    url: API_ENDPOINT,
    enabled: true,
  });

  // Add FAQ
  const {
    postData: addFAQ,
    loading: isAdding,
    error: addError,
    validationErrors: addValidationErrors,
    reset: resetAdd,
  } = usePostData<FAQ>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "FAQ added successfully",
    errorMessage: "Failed to add FAQ",
    onSuccess: () => {
      refetchFAQs();
      closeAddModal();
      resetAdd();
    },
  });

  // Update FAQ
  const {
    putData: updateFAQ,
    loading: isUpdating,
    error: updateError,
    validationErrors: updateValidationErrors,
    reset: resetUpdate,
  } = usePutData<FAQ>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "FAQ updated successfully",
    errorMessage: "Failed to update FAQ",
    onSuccess: () => {
      refetchFAQs();
      closeEditModal();
      resetUpdate();
    },
  });

  const {
    deleteData,
    loading: isDeleting,
    error: deleteError,
    reset: resetDelete,
  } = useDeleteData<FAQ>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "FAQ deleted successfully",
    errorMessage: "Failed to delete FAQ",
    onDeleteSuccess: () => {
      refetchFAQs();
      closeDeleteModal();
    },
  });

  const faqs = faqsData?.data || [];

  // Get stats
  const activeCount = faqs.filter(faq => faq.is_active).length;
  const totalCount = faqs.length;

  // Modal handlers
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    resetAdd();
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFAQ(faq);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingFAQ(null);
    resetUpdate();
  };

  const openDeleteModal = (faq: FAQ) => {
    setDeletingFAQ(faq);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingFAQ(null);
    resetDelete();
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    if (deletingFAQ?.id) {
      await deleteData(deletingFAQ.id);
    }
  };

  // Handle add FAQ
  const handleAddFAQ = async (data: FAQ) => {
    await addFAQ(data);
  };

  // Handle edit FAQ
  const handleEditFAQ = async (data: FAQ, id: number) => {
    await updateFAQ(data, id.toString());
  };

  return (
    <div className="mx-auto pb-32 p-6 max-h-[90vh] sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Header
          title="Manage Frequently Asked Questions"
          description="Add and manage FAQ questions and answers for your website"
        />
        <Button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary-color1 text-white hover:bg-primary-color1/90"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard
          icon={HelpCircle}
          title="Total FAQs"
          value={totalCount}
          iconBgColor="from-blue-500 to-blue-600"
          borderColor="border-blue-200 dark:border-blue-800"
          description="All frequently asked questions"
        />
        
        <StatsCard
          icon={HelpCircle}
          title="Active FAQs"
          value={activeCount}
          iconBgColor="from-green-500 to-green-600"
          borderColor="border-green-200 dark:border-green-800"
          description="Currently active questions"
        />
        
        <StatsCard
          icon={HelpCircle}
          title="Inactive FAQs"
          value={totalCount - activeCount}
          iconBgColor="from-gray-500 to-gray-600"
          borderColor="border-gray-200 dark:border-gray-800"
          description="Currently inactive questions"
        />
      </div>

      {/* FAQ Cards */}
      <div>
        {faqs.length === 0 ? (
          <EmptyState
            title="No FAQs Found"
            description="Get started by adding your first frequently asked question to help your users find answers"
          image={images.FAQs}
            action={
              <Button
                onClick={openAddModal}
                className="flex items-center gap-2 bg-primary-color1 text-white hover:bg-primary-color1/90"
              >
                <Plus className="w-4 h-4" />
                Add First FAQ
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQCard
                key={faq.id}
                faq={faq}
                onEdit={() => openEditModal(faq)}
                onDelete={() => openDeleteModal(faq)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add FAQ Modal */}
      {isAddModalOpen && (
        <AddFAQModal
          open={isAddModalOpen}
          onClose={closeAddModal}
          onAddFAQ={handleAddFAQ}
          isLoading={isAdding}
        />
      )}

      {/* Edit FAQ Modal */}
      {isEditModalOpen && editingFAQ && (
        <EditFAQModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          onEditFAQ={(data) => handleEditFAQ(data, editingFAQ.id!)}
          isLoading={isUpdating}
          editingFAQ={editingFAQ}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
          isLoading={isDeleting}
          itemName={deletingFAQ?.question || "this FAQ"}
          description="This will permanently remove the FAQ from the system."
        />
      )}
    </div>
  );
};

export default FAQPage;