import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { notification } from "antd";

interface UseToggleStatusOptions {
  showNotifications?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string | Record<string, string[]>) => void;
  onValidationError?: (errors: Record<string, string[]>) => void;
  onFinally?: () => void;
  getNewStatus?: (currentStatus: string) => string; 
  getPayload?: (newStatus: string) => any;
}

interface UseToggleStatusReturn {
  toggleStatus: (currentStatus: string, id?: string) => Promise<any>;
  loading: boolean;
  error: string | Record<string, string[]> | null;
  validationErrors: Record<string, string[]> | null;
  success: boolean;
  reset: () => void;
}

interface BackendErrorResponse {
  message?: string;
  error?: string;
  details?: string;
  errors?: Record<string, string[]>;
  status?: boolean;
  data?: any;
}

const useToggleStatus = (
  url: string,
  options: UseToggleStatusOptions = {},
  axiosConfig: AxiosRequestConfig = {}
): UseToggleStatusReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | Record<string, string[]> | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    showNotifications = false,
    successMessage = "Status updated successfully",
    errorMessage = "Failed to update status",
    onSuccess,
    onError,
    onValidationError,
    onFinally,
    getNewStatus = defaultGetNewStatus,
    getPayload = defaultGetPayload,
  } = options;

  const toggleStatus = useCallback(
    async (currentStatus: string, id?: string): Promise<any> => {
      setLoading(true);
      setError(null);
      setValidationErrors(null);
      setSuccess(false);

      try {
        // Get new status and payload
        const newStatus = getNewStatus(currentStatus);
        const payload = getPayload(newStatus);
        
        const finalUrl = id ? `${url}/${id}` : url;

        const response = await axios({
          url: finalUrl,
          method: "POST",
          data: payload,
          ...axiosConfig,
        });

        setSuccess(true);
        setValidationErrors(null);

        if (showNotifications && successMessage) {
          notification.success({
            message: "Success",
            description: successMessage,
            placement: "topRight",
            duration: 4,
          });
        }

        onSuccess?.(response.data);
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError<BackendErrorResponse>;
        const responseData = axiosError.response?.data;

        // Reset validation errors first
        setValidationErrors(null);

        if (responseData) {
          // Case 1: Validation errors (status: false, errors object)
          if (responseData.status === false && responseData.errors) {
            const validationErrors = responseData.errors;
            setValidationErrors(validationErrors);

            if (showNotifications) {
              // Show each validation error as separate notification
              Object.entries(validationErrors).forEach(([field, messages]) => {
                messages.forEach((message: string) => {
                  notification.error({
                    message: `Validation Error: ${field.charAt(0).toUpperCase() + field.slice(1)}`,
                    description: message,
                    placement: "topRight",
                    duration: 6,
                  });
                });
              });
            }

            onValidationError?.(validationErrors);
            onError?.(responseData.message || "Validation failed");
            return null;
          }

          // Case 2: Regular error message
          if (responseData.message) {
            const errorMsg = responseData.message;
            setError(errorMsg);

            if (showNotifications) {
              notification.error({
                message: "Error",
                description: errorMsg,
                placement: "topRight",
                duration: 5,
              });
            }

            onError?.(errorMsg);
            return null;
          }

          // Case 3: Error in error field
          if (responseData.error) {
            const errorMsg = responseData.error;
            setError(errorMsg);

            if (showNotifications) {
              notification.error({
                message: "Error",
                description: errorMsg,
                placement: "topRight",
                duration: 5,
              });
            }

            onError?.(errorMsg);
            return null;
          }
        }

        // Default error
        const defaultError = axiosError.message || errorMessage;
        setError(defaultError);

        if (showNotifications) {
          notification.error({
            message: "Error",
            description: defaultError,
            placement: "topRight",
            duration: 5,
          });
        }

        onError?.(defaultError);
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
      onValidationError,
      onFinally,
      getNewStatus,
      getPayload,
      JSON.stringify(axiosConfig),
    ]
  );

  const reset = useCallback(() => {
    setError(null);
    setValidationErrors(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  return {
    toggleStatus,
    loading,
    error,
    validationErrors,
    success,
    reset
  };
};

// Default status mapping
function defaultGetNewStatus(currentStatus: string): string {
  const statusMap: Record<string, string> = {
    'active': 'inactive',
    'inactive': 'active',
    'enabled': 'disabled',
    'disabled': 'enabled',
    'published': 'draft',
    'draft': 'published',
    'verified': 'unverified',
    'unverified': 'verified',
    'open': 'closed',
    'closed': 'open',
    'true': 'false',
    'false': 'true',
    'on': 'off',
    'off': 'on',
  };

  return statusMap[currentStatus.toLowerCase()] || 
         (currentStatus === 'active' ? 'inactive' : 'active');
}

// Default payload
function defaultGetPayload(newStatus: string): any {
  return { status: newStatus };
}

export default useToggleStatus;