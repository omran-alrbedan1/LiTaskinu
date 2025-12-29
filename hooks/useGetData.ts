import { useState, useEffect, useCallback, useRef } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

interface UseGetDataProps {
  url: string;
  initialData?: any;
  enabled?: boolean;
}

interface UseGetDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useGetData = <T = any>({
  url,
  initialData = null,
  enabled = true,
  ...axiosConfig
}: UseGetDataProps & AxiosRequestConfig): UseGetDataReturn<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [isInitialFetch, setIsInitialFetch] = useState<boolean>(true);

  const lastUrlRef = useRef<string>("");

  const fetchData = useCallback(async () => {
    if (!enabled || !url) return;

    lastUrlRef.current = url;

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
      const axiosError = err as AxiosError<any>;
      const backendError =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "An error occurred";

      setError(backendError);
    } finally {
      setLoading(false);
      setIsInitialFetch(false);
    }
  }, [url, enabled, isInitialFetch]);

  useEffect(() => {
    if (enabled && url) {
      setLoading(true);
    }
  }, [enabled, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    setIsInitialFetch(true);
    lastUrlRef.current = "";
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useGetData;