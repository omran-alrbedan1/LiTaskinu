"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import { Plus } from "lucide-react";
import DeleteModal from "@/components/admin/shared/DeleteModal";

import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";
import usePutData from "@/hooks/usePutData";
import useDeleteData from "@/hooks/useDeleteData";
import { EmptyState } from "@/components/shared";
import Loader from "@/components/shared/Loader";
import { images } from "@/constants/images";
import { AddStoryModal } from "./_components/AddStoryModal";
import { EditStoryModal } from "./_components/EditStoryModal";
import { SuccessStoryCard } from "./_components/StoryCard";

interface SuccessStory {
  id: number;
  name_male: string;
  name_female: string;
  description: string;
  testimonial: string;
  rating: string;
  country_id: string;
  city_id: string;
  created_at: string;
  updated_at: string;
  country?: {
    id: number;
    name: string;
  };
  city?: {
    id: number;
    name: string;
  };
}

const SuccessStoriesPage = () => {
  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [deletingStory, setDeletingStory] = useState<SuccessStory | null>(null);
  
  // API endpoint
  const API_ENDPOINT = "/api/admin/success-stories";

  // Fetch success stories
  const {
    data: storiesData,
    loading: isFetching,
    error: fetchError,
    refetch: refetchStories,
  } = useGetData<{ data: SuccessStory[] }>({
    url: API_ENDPOINT,
    enabled: true,
  });

  // Add success story
  const {
    postData: addStory,
    loading: isAdding,
    error: addError,
    validationErrors: addValidationErrors,
    reset: resetAdd,
  } = usePostData<SuccessStory>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "Success story added successfully",
    errorMessage: "Failed to add success story",
    onSuccess: () => {
      refetchStories();
      closeAddModal();
      resetAdd();
    },
  });

  // Update success story
  const {
    putData: updateStory,
    loading: isUpdating,
    error: updateError,
    validationErrors: updateValidationErrors,
    reset: resetUpdate,
  } = usePutData<SuccessStory>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "Success story updated successfully",
    errorMessage: "Failed to update success story",
    onSuccess: () => {
      refetchStories();
      closeEditModal();
      resetUpdate();
    },
  });

  // Delete success story
  const {
    deleteData,
    loading: isDeleting,
    error: deleteError,
    reset: resetDelete,
  } = useDeleteData<SuccessStory>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "Success story deleted successfully",
    errorMessage: "Failed to delete success story",
    onDeleteSuccess: () => {
      refetchStories();
      closeDeleteModal();
      resetDelete();
    },
  });

  const stories = storiesData?.data || [];

  // Modal handlers
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    resetAdd();
  };

  const openEditModal = (story: SuccessStory) => {
    setEditingStory(story);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingStory(null);
    resetUpdate();
  };

  const openDeleteModal = (story: SuccessStory) => {
    setDeletingStory(story);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingStory(null);
    resetDelete();
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    if (deletingStory?.id) {
      await deleteData(deletingStory.id);
    }
  };

  // Handle add story
  const handleAddStory = async (data: any) => {
    await addStory(data);
  };

  // Handle edit story
  const handleEditStory = async (data: any) => {
    if (editingStory?.id) {
      await updateStory(data, editingStory.id.toString());
    }
  };

  return (
    <div className="mx-auto pb-32 p-6 max-h-[90vh] sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Header
          title="Manage Success Stories"
          description="Add and manage inspiring success stories from couples who found love on your platform"
        />
        <Button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary-color1 text-white hover:bg-primary-color1/90"
        >
          <Plus className="w-4 h-4" />
          Add Story
        </Button>
      </div>

      {/* Loading State */}
      {isFetching ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : stories.length === 0 ? (
        <EmptyState
          title="No Success Stories Found"
          description="Get started by adding your first inspiring success story to showcase happy couples"
          image={images.successStory}
          action={
            <Button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-primary-color1 text-white hover:bg-primary-color1/90"
            >
              <Plus className="w-4 h-4" />
              Add First Story
            </Button>
          }
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {stories.map((story) => (
              <SuccessStoryCard
                key={story.id}
                story={story}
                onEdit={() => openEditModal(story)}
                onDelete={() => openDeleteModal(story)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add Story Modal */}
      {isAddModalOpen && (
        <AddStoryModal
          open={isAddModalOpen}
          onClose={closeAddModal}
          onAddStory={handleAddStory}
          isLoading={isAdding}
        />
      )}

      {/* Edit Story Modal */}
      {isEditModalOpen && editingStory && (
        <EditStoryModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          onEditStory={handleEditStory}
          isLoading={isUpdating}
          editingStory={editingStory}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && deletingStory && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
          isLoading={isDeleting}
          itemName={`${deletingStory.name_male} & ${deletingStory.name_female}'s story`}
          description="This will permanently remove the success story from the system. This action cannot be undone."
        />
      )}
    </div>
  );
};

export default SuccessStoriesPage;