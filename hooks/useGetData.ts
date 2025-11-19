// hooks/useGetData.ts
import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

interface UseGetDataProps {
  url: string;
  dependencies?: any[];
  initialData?: any;
  enabled?: boolean;
  showNotifications?: boolean;
  successMessage?: string;
}

interface UseGetDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useGetData = <T = any>({
  url,
  dependencies = [],
  initialData = null,
  enabled = true,
  showNotifications = false,
  successMessage,
  ...axiosConfig
}: UseGetDataProps & AxiosRequestConfig): UseGetDataReturn<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    if (!enabled || !url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios<T>({
        url,
        method: "GET",
        ...axiosConfig,
      });

      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<{
        message?: string;
        error?: string;
      }>;
      const backendError =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "An error occurred";
      setError(backendError);
    } finally {
      setLoading(false);
    }
  }, [url, enabled, JSON.stringify(axiosConfig)]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  const refetch = (): void => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useGetData;
