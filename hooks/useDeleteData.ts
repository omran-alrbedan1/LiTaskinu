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
}

interface UseDeleteDataReturn<T> {
  deleteData: (id?: string | number) => Promise<T | null>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

const useDeleteData = <T = any>(
  baseUrl: string,
  options: UseDeleteDataOptions = {},
  axiosConfig: AxiosRequestConfig = {}
): UseDeleteDataReturn<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    showNotifications = false,
    successMessage = "Item deleted successfully",
    errorMessage = "Failed to delete item",
    onSuccess,
    onError,
    onFinally,
  } = options;

  const deleteData = useCallback(
    async (id?: string | number): Promise<T | null> => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        // Construct the final URL with ID
        const finalUrl = id ? `${baseUrl}?id=${id}` : baseUrl;

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
      JSON.stringify(axiosConfig),
    ]
  );

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  return { deleteData, loading, error, success, reset };
};

export default useDeleteData;
