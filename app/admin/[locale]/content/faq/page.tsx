"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header, StatsCard } from "@/components/admin/shared";
import { Plus, HelpCircle, Grid3X3, List } from "lucide-react";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { AddFAQModal } from "./_components/AddFAQModal";
import { EditFAQModal } from "./_components/EditFAQModal";
import { FAQCard, FAQCardCompact } from "./_components/FAQCard";
import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";
import usePutData from "@/hooks/usePutData";
import useDeleteData from "@/hooks/useDeleteData";
import Loader from "@/components/shared/Loader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Type definition
interface FAQ {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

const FAQPage = () => {
  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
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

  // Delete FAQ
  const {
    deleteData,
    handleDelete: openDeleteConfirm,
    confirmDelete,
    cancelDelete,
    loading: isDeleting,
    error: deleteError,
    isDeleteModalOpen: deleteHookModalOpen,
    selectedItem: deleteHookItem,
  } = useDeleteData<FAQ>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "FAQ deleted successfully",
    errorMessage: "Failed to delete FAQ",
    onDeleteSuccess: () => {
      refetchFAQs();
    },
  });

  // Extract FAQ array from response
  const faqs = faqsData?.data || [];

  // Filter FAQs based on status
  const filteredFAQs = faqs.filter(faq => {
    if (statusFilter === "all") return true;
    if (statusFilter === "active") return faq.is_active;
    if (statusFilter === "inactive") return !faq.is_active;
    return true;
  });

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

  // Handle add FAQ
  const handleAddFAQ = async (data: FAQ) => {
    await addFAQ(data);
  };

  // Handle edit FAQ
  const handleEditFAQ = async (data: FAQ, id: number) => {
    await updateFAQ(data, id.toString());
  };

  // Handle delete FAQ
  const handleDeleteFAQ = async (id: number) => {
    openDeleteConfirm(id);
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
          iconClassName="text-green-500"
        />
        
        <StatsCard
          icon={HelpCircle}
          title="Inactive FAQs"
          value={totalCount - activeCount}
          iconBgColor="from-gray-500 to-gray-600"
          borderColor="border-gray-200 dark:border-gray-800"
          description="Currently inactive questions"
          iconClassName="text-gray-500"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold">{filteredFAQs.length}</span> of <span className="font-semibold">{totalCount}</span> FAQs
        </div>
        
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
            <TabsList>
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Grid3X3 className="w-4 h-4" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {isFetching && (
        <div className="flex justify-center items-center p-12">
          <Loader />
        </div>
      )}

      {/* Error State */}
      {fetchError && !isFetching && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Failed to load FAQs</p>
          <p className="text-red-500 text-sm mt-1">{fetchError}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => refetchFAQs()}
          >
            Try Again
          </Button>
        </div>
      )}

      {/* FAQ Cards */}
      {!isFetching && !fetchError && (
        <div>
          {filteredFAQs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <HelpCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {statusFilter === "all" ? "No FAQs yet" : "No matching FAQs"}
              </h3>
              <p className="text-gray-500 mb-6">
                {statusFilter === "all" 
                  ? "Get started by adding your first frequently asked question"
                  : `No FAQs found with ${statusFilter} status`
                }
              </p>
              <Button
                onClick={openAddModal}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add First FAQ
              </Button>
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredFAQs.map((faq) => (
                viewMode === "grid" ? (
                  <FAQCard
                    key={faq.id}
                    faq={faq}
                    onEdit={openEditModal}
                    onDelete={handleDeleteFAQ}
                  />
                ) : (
                  <FAQCardCompact
                    key={faq.id}
                    faq={faq}
                    onEdit={openEditModal}
                    onDelete={handleDeleteFAQ}
                  />
                )
              ))}
            </div>
          )}
        </div>
      )}

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
          onEditFAQ={handleEditFAQ}
          isLoading={isUpdating}
          editingFAQ={editingFAQ}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteHookModalOpen && deleteHookItem && (
        <DeleteModal
          isOpen={deleteHookModalOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          isLoading={isDeleting}
          itemName="this FAQ"
          description="This will permanently remove the FAQ from the system."
        />
      )}
    </div>
  );
};

export default FAQPage;