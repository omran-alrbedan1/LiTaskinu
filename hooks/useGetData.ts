
  import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { useMemo } from 'react';

interface UseGetDataProps {
  url: string;
  initialData?: any;
  enabled?: boolean;
  queryOptions?: Omit<UseQueryOptions<any, AxiosError, any, any[]>, 'queryKey' | 'queryFn'>;
}

const useGetData = <T = any>({
  url,
  initialData = null,
  enabled = true,
  queryOptions = {},
  ...axiosConfig
}: UseGetDataProps & AxiosRequestConfig) => {
  const queryKey = useMemo(() => {
    return ['useGetData', url, axiosConfig];
  }, [url, JSON.stringify(axiosConfig)]);

  const fetchData = async (): Promise<T> => {
    if (!url) {
      throw new Error('URL is required');
    }

    const response = await axios<T>({
      url,
      method: 'GET',
      ...axiosConfig,
    });

    return response.data;
  };

 const queryResult = useQuery({
    queryKey,
    queryFn: fetchData,
    enabled: enabled && !!url,
    initialData: initialData !== null ? initialData : undefined,
    retry: 1, 
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    
    ...queryOptions,
  });
  const formattedResult = {
    data: queryResult.data ?? initialData,
    loading: queryResult.isLoading,
    error: queryResult.error
      ? (() => {
          const axiosError = queryResult.error as AxiosError<any>;
          return (
            axiosError.response?.data?.message ||
            axiosError.response?.data?.error ||
            axiosError.message ||
            'حدث خطأ'
          );
        })()
      : null,
    refetch: queryResult.refetch,
    isFetching: queryResult.isFetching,
    isError: queryResult.isError,
    status: queryResult.status,
  };

  return formattedResult;
};



export default useGetData;