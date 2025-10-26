import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { notification } from "antd";

interface UsePostDataOptions {
  showNotifications?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  onFinally?: () => void;
}

interface UsePostDataReturn<T> {
  postData: (data: any) => Promise<T | null>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

const usePostData = <T = any>(
  url: string,
  options: UsePostDataOptions = {},
  axiosConfig: AxiosRequestConfig = {}
): UsePostDataReturn<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    showNotifications = false,
    successMessage = "Operation completed successfully",
    errorMessage = "An error occurred",
    onSuccess,
    onError,
    onFinally,
  } = options;

  const postData = useCallback(
    async (postData: any): Promise<T | null> => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await axios<T>({
          url,
          method: "POST",
          data: postData,
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
      url,
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

  return { postData, loading, error, success, reset };
};

export default usePostData;
