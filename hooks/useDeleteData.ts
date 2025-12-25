import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { notification } from "antd";

interface UseDeleteDataOptions {
  showNotifications?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  onFinally?: () => void;
  onDeleteSuccess?: () => void;
  autoRefetch?: boolean;
}

interface UseDeleteDataReturn<T> {
  // Delete functions
  deleteData: (id?: string | number) => Promise<T | null>;
  handleDelete: (item: T, id?: string | number) => void;
  confirmDelete: () => Promise<void>;
  cancelDelete: () => void;

  // State
  loading: boolean;
  error: string | null;
  success: boolean;
  isDeleteModalOpen: boolean;
  selectedItem: T | null;

  // Utility functions
  reset: () => void;
  setRefetch: (refetchFn: () => void) => void;
}

const useDeleteData = <T = any>(
  baseUrl: string,
  options: UseDeleteDataOptions = {},
  axiosConfig: AxiosRequestConfig = {}
): UseDeleteDataReturn<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [refetchFn, setRefetchFn] = useState<(() => void) | null>(null);

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [pendingId, setPendingId] = useState<string | number | undefined>();

  const {
    showNotifications = false,
    successMessage = "Item deleted successfully",
    errorMessage = "Failed to delete item",
    onSuccess,
    onError,
    onFinally,
    onDeleteSuccess,
    autoRefetch = false,
  } = options;

  // Main delete function
  const deleteData = useCallback(
    async (id?: string | number): Promise<T | null> => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        // Construct the final URL with ID
        const finalUrl = id ? `${baseUrl}/${id}` : baseUrl;

        const response = await axios<T>({
          url: finalUrl,
          method: "DELETE",
          ...axiosConfig,
        });

        setSuccess(true);

        if (showNotifications && successMessage) {
          notification.success({
            message: "Success",
            description: successMessage,
            placement: "topRight",
          });
        }

        onSuccess?.(response.data);

        // Call onDeleteSuccess callback
        onDeleteSuccess?.();

        // Auto refetch if enabled and refetch function is set
        if (autoRefetch && refetchFn) {
          refetchFn();
        }

        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError<{
          message?: string;
          error?: string;
          details?: string;
        }>;

        const backendError =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          axiosError.response?.data?.details ||
          axiosError.message ||
          errorMessage;

        setError(backendError);

        if (showNotifications) {
          notification.error({
            message: "Error",
            description: backendError,
            placement: "topRight",
          });
        }

        onError?.(backendError);
        return null;
      } finally {
        setLoading(false);
        onFinally?.();
      }
    },
    [
      baseUrl,
      showNotifications,
      successMessage,
      errorMessage,
      onSuccess,
      onError,
      onFinally,
      onDeleteSuccess,
      autoRefetch,
      refetchFn,
      JSON.stringify(axiosConfig),
    ]
  );

  const handleDelete = useCallback((item: T, id?: string | number) => {
    setSelectedItem(item);
    setPendingId(id || (item as any)?.id);
    setIsDeleteModalOpen(true);
  }, []);

  // Confirm deletion (called from modal)
  const confirmDelete = useCallback(async (): Promise<void> => {
    if (!pendingId && !(selectedItem as any)?.id) {
      console.error("No ID provided for deletion");
      return;
    }

    const idToDelete = pendingId || (selectedItem as any)?.id;
    await deleteData(idToDelete);

    // Close modal after deletion (success or failure)
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
    setPendingId(undefined);
  }, [deleteData, pendingId, selectedItem]);

  // Cancel deletion
  const cancelDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
    setPendingId(undefined);
    setError(null);
  }, []);

  // Set refetch function
  const setRefetch = useCallback((refetchFunction: () => void) => {
    setRefetchFn(() => refetchFunction);
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
    setPendingId(undefined);
    setRefetchFn(null);
  }, []);

  return {
    // Delete functions
    deleteData,
    handleDelete,
    confirmDelete,
    cancelDelete,

    // State
    loading,
    error,
    success,
    isDeleteModalOpen,
    selectedItem,

    // Utility functions
    reset,
    setRefetch,
  };
};

export default useDeleteData;
