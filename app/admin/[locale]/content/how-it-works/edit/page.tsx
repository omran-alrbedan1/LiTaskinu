// app/admin/how-it-works/edit/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { howItWorks } from "@/constants/admin";
import CreateStepModal from "./_components/CreateStepModal";
import EditStepModal from "./_components/EditStepModal";
import StepItem from "./_components/StepItem";
import { EmptyState } from "@/components/shared";
import CustomHeader from "@/components/shared/CustomHeader";
import { images } from "@/constants/images";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import usePostData from "@/hooks/usePostData";
import useDeleteData from "@/hooks/useDeleteData";

const HowItWorksEditPage = () => {
  const [steps, setSteps] = useState<Step[]>(howItWorks);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State for current operation
  const [editingStep, setEditingStep] = useState<Step | null>(null);

  // Use hooks
  const {
    postData: createStep,
    loading: isCreating,
    error: createError,
    reset: resetCreate,
  } = usePostData<Step>("/api/admin/how-it-works/steps", {
    showNotifications: true,
    successMessage: "Step created successfully!",
    errorMessage: "Failed to create step",
  });

  const {
    postData: updateStep,
    loading: isUpdating,
    error: updateError,
    reset: resetUpdate,
  } = usePostData<Step>("/api/admin/how-it-works/steps", {
    showNotifications: true,
    successMessage: "Step updated successfully!",
    errorMessage: "Failed to update step",
  });

  const {
    deleteData,
    handleDelete,
    confirmDelete,
    cancelDelete,
    loading: isDeleting,
    error: deleteError,
    isDeleteModalOpen,
    selectedItem,
    reset: resetDelete,
  } = useDeleteData<Step>("/api/admin/how-it-works/steps", {
    showNotifications: true,
    successMessage: "Step deleted successfully!",
    errorMessage: "Failed to delete step",
    onDeleteSuccess: () => {
      // Refetch steps after deletion
      // In a real app, you might want to refetch from API
      // For now, we'll handle it locally
      if (selectedItem) {
        const updatedSteps = steps
          .filter((step) => step.id !== (selectedItem as any).id)
          .map((step, index) => ({
            ...step,
            order: index + 1,
          }));
        setSteps(updatedSteps);
      }
    },
  });

  // Open Create Modal
  const showCreateModal = () => {
    resetCreate(); // Reset create state
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal
  const showEditModal = (step: Step) => {
    resetUpdate(); // Reset update state
    setEditingStep(step);
    setIsEditModalOpen(true);
  };

  // Handle Create
  const handleCreate = async (values: {
    title: string;
    description: string;
  }) => {
    try {
      const newStep = {
        ...values,
        order: steps.length + 1,
      };

      // If using API, uncomment this:
      // const createdStep = await createStep(newStep);
      // if (createdStep) {
      //   setSteps([...steps, createdStep]);
      //   setIsCreateModalOpen(false);
      // }

      // Simulated local update (remove when using API)
      const createdStep: Step = {
        id: Date.now().toString(),
        ...newStep,
      };

      setSteps([...steps, createdStep]);
      setIsCreateModalOpen(false);

      return Promise.resolve(); // Return promise for modal
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Handle Update
  const handleUpdate = async (values: {
    title: string;
    description: string;
  }) => {
    if (!editingStep) return;

    try {
      const updatedStepData = {
        ...editingStep,
        ...values,
      };

      // If using API, uncomment this:
      // const updatedStep = await updateStep(updatedStepData);
      // if (updatedStep) {
      //   const updatedSteps = steps.map((step) =>
      //     step.id === editingStep.id ? updatedStep : step
      //   );
      //   setSteps(updatedSteps);
      //   setIsEditModalOpen(false);
      //   setEditingStep(null);
      // }

      // Simulated local update (remove when using API)
      const updatedSteps = steps.map((step) =>
        step.id === editingStep.id ? { ...step, ...values } : step
      );

      setSteps(updatedSteps);
      setIsEditModalOpen(false);
      setEditingStep(null);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Handle item deletion (triggers the delete modal)
  const handleItemDelete = (step: Step) => {
    handleDelete(step, step.id);
  };

  // Handle modal close with reset
  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    resetCreate();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingStep(null);
    resetUpdate();
  };

  const handleDeleteModalClose = () => {
    cancelDelete();
    resetDelete();
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-h-screen overflow-auto sidebar-scrollbar mb-32">
      <CustomHeader
        title="Edit How It Works"
        description="Manage the steps that guide users through your platform"
        backLink="./"
      >
        <div className="flex gap-3">
          <Button onClick={showCreateModal}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Step
          </Button>
        </div>
      </CustomHeader>

      <div className="grid grid-cols-1 gap-8 pb-32">
        {/* Steps Management */}
        <Card>
          <CardContent>
            {steps.length === 0 ? (
              <EmptyState
                image={images.emptySteps}
                title="No Steps Found"
                description="No steps have been added yet"
              />
            ) : (
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <StepItem
                    key={step.id}
                    step={step}
                    index={index}
                    totalSteps={steps.length}
                    onEdit={showEditModal}
                    onDelete={() => handleItemDelete(step)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Step Modal */}
      <CreateStepModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onCreate={handleCreate}
        loading={isCreating}
      />

      {/* Edit Step Modal */}
      <EditStepModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onUpdate={handleUpdate}
        step={editingStep}
        loading={isUpdating}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Step"
        itemName={
          selectedItem ? `"${(selectedItem as any).title}"` : "this step"
        }
        description="This will permanently delete the step from your system. The remaining steps will be renumbered automatically."
      />
    </div>
  );
};

export default HowItWorksEditPage;
