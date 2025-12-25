import { useState } from "react";
import usePostData from "./usePostData";
import useGetData from "./useGetData";
import usePutData from "./usePutData";
import useDeleteData from "./useDeleteData";

interface CrudConfig {
  endpoint: string;
  itemName: string;
  enableAutoFetch?: boolean;
}

export const useCrudOperations = <T extends { id: number }>({
  endpoint,
  itemName,
  enableAutoFetch = true,
}: CrudConfig) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch data
  const { data, loading, error, refetch } = useGetData<T[]>({
    url: endpoint,
    enabled: enableAutoFetch,
  });

  // Create operation
  const {
    postData: createData,
    loading: isCreating,
    error: createError,
  } = usePostData(endpoint, {
    showNotifications: true,
    successMessage: `${itemName} added successfully!`,
    errorMessage: `Failed to add ${itemName}`,
    onSuccess: refetch,
  });

  // Update operation
  const {
    putData: updateData,
    loading: isUpdating,
    error: updateError,
  } = usePutData(endpoint, {
    showNotifications: true,
    successMessage: `${itemName} updated successfully!`,
    errorMessage: `Failed to update ${itemName}`,
    onSuccess: () => {
      refetch();
      closeEditModal();
    },
  });

  // Delete operation - using enhanced useDeleteData
  const {
    handleDelete: enhancedHandleDelete, // Renamed to avoid conflict
    confirmDelete,
    cancelDelete,
    loading: isDeleting,
    error: deleteError,
    isDeleteModalOpen,
    selectedItem: deleteSelectedItem,
  } = useDeleteData<T>(endpoint, {
    showNotifications: true,
    successMessage: `${itemName} deleted successfully!`,
    errorMessage: `Failed to delete ${itemName}`,
    onDeleteSuccess: refetch, // Use onDeleteSuccess for auto refetch
    autoRefetch: true,
  });

  const createItem = async (formData: Omit<T, "id">) => {
    await createData(formData);
  };

  const updateItem = async (formData: Omit<T, "id">, id: number) => {
    await updateData(formData, id);
  };

  const deleteItem = async (id: number) => {
    // This function is kept for backward compatibility
    // but now uses the enhanced delete flow internally
    await enhancedHandleDelete({ id } as T, id);
  };

  // Add Modal management
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Edit modal management
  const openEditModal = (item: T) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  // Delete modal management - using enhanced functions
  const openDeleteModal = (item: T) => {
    setSelectedItem(item);
    enhancedHandleDelete(item, item.id);
  };

  const closeDeleteModal = () => {
    cancelDelete();
    setSelectedItem(null);
  };

  // Keep handleDelete for backward compatibility
  const handleDelete = async () => {
    if (selectedItem?.id) {
      await confirmDelete();
    }
  };

  const getSelectedItemName = (): string => {
    // Use the item from delete hook if available, otherwise use our selectedItem
    const itemToUse = deleteSelectedItem || selectedItem;

    if (!itemToUse) return "this item";

    // Handle different item structures
    if (typeof (itemToUse as any).name === "string") {
      return (itemToUse as any).name;
    } else if ((itemToUse as any).name?.en) {
      return (itemToUse as any).name.en;
    } else if ((itemToUse as any).title) {
      return (itemToUse as any).title;
    } else if ((itemToUse as any).first_name && (itemToUse as any).last_name) {
      return `${(itemToUse as any).first_name} ${(itemToUse as any).last_name}`;
    }

    return `${itemName} #${itemToUse.id}`;
  };

  return {
    // Data
    data,
    loading,
    error,
    refetch,

    // Operations
    createItem,
    updateItem,
    deleteItem, // Backward compatible

    // Modal states
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen, // From useDeleteData hook

    // Modal management functions
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal, // Backward compatible
    closeDeleteModal, // Backward compatible

    // Delete specific - backward compatible
    handleDelete, // This will still work

    // Enhanced delete functions (expose if needed)
    confirmDelete,
    cancelDelete,

    // Selected item info
    selectedItem: selectedItem || deleteSelectedItem, // Merge both selected items
    selectedItemName: getSelectedItemName(),

    // Loading states
    isCreating,
    isUpdating,
    isDeleting,

    // Errors
    createError,
    updateError,
    deleteError,
  };
};
