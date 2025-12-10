import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export interface FilterConfig<T> {
  defaultFilters: T;
  buildRouterURL: (filters: T) => string;
  syncStrategy?: "auto" | "manual";
}

export const useQueryFilters = <T extends Record<string, string>>({
  defaultFilters,
  buildRouterURL,
  syncStrategy = "auto",
}: FilterConfig<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getInitialFilters = useCallback((): T => {
    const filters = { ...defaultFilters };

    Object.keys(defaultFilters).forEach((key) => {
      const paramValue = searchParams.get(key);
      if (paramValue !== null) {
        filters[key as keyof T] = paramValue as T[keyof T];
      }
    });

    return filters;
  }, [searchParams, defaultFilters]);

  const [filters, setFilters] = useState<T>(getInitialFilters);
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || defaultFilters.search || ""
  );

  const updateURL = useCallback(
    (newFilters: T) => {
      const newUrl = buildRouterURL(newFilters);
      router.push(newUrl, { scroll: false });
    },
    [router, buildRouterURL]
  );

  const updateFilter = useCallback(
    (key: keyof T, value: string) => {
      const newFilters = { ...filters, [key]: value, page: "1" };
      setFilters(newFilters);

      if (key === "search") {
        setSearchText(value);
      }

      if (syncStrategy === "auto") {
        updateURL(newFilters);
      }
    },
    [filters, updateURL, syncStrategy]
  );

  const updateMultipleFilters = useCallback(
    (updates: Partial<T>) => {
      const newFilters = { ...filters, ...updates, page: "1" };
      setFilters(newFilters);

      if ("search" in updates) {
        setSearchText(updates.search as string);
      }

      if (syncStrategy === "auto") {
        updateURL(newFilters);
      }
    },
    [filters, updateURL, syncStrategy]
  );

  // Handle search specifically
  const handleSearch = useCallback(
    (value: string) => {
      updateFilter("search" as keyof T, value);
    },
    [updateFilter]
  );

  // Handle pagination
  const handlePaginationChange = useCallback(
    (page: number, pageSize: number) => {
      const newFilters = {
        ...filters,
        page: page.toString(),
        pageSize: pageSize.toString(),
      };
      setFilters(newFilters);

      if (syncStrategy === "auto") {
        updateURL(newFilters);
      }
    },
    [filters, updateURL, syncStrategy]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    const newFilters = { ...defaultFilters };
    setFilters(newFilters);
    setSearchText(defaultFilters.search || "");

    if (syncStrategy === "auto") {
      updateURL(newFilters);
    }
  }, [defaultFilters, updateURL, syncStrategy]);

  // Manual sync (for when syncStrategy is 'manual')
  const syncToURL = useCallback(() => {
    updateURL(filters);
  }, [filters, updateURL]);

  // Sync URL params with state when they change
  useEffect(() => {
    if (syncStrategy === "auto") {
      const newFilters = getInitialFilters();

      if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
        setFilters(newFilters);
        setSearchText(newFilters.search || "");
      }
    }
  }, [searchParams, filters, getInitialFilters, syncStrategy]);

  return {
    // State
    filters,
    searchText,

    // Actions
    updateFilter,
    updateMultipleFilters,
    handleSearch,
    handlePaginationChange,
    clearFilters,
    syncToURL,

    // Setters (for direct state updates when needed)
    setFilters,
    setSearchText,
  };
};
