// hooks/useUserFilters.ts
import { useQueryFilters } from "./useQueryFilters";

const defaultUserFilters: UserFilters = {
  status: "",
  verification: "",
  search: "",
  page: "1",
  pageSize: "10",
};

const buildUserRouterURL = (filters: UserFilters): string => {
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.verification) params.append("verification", filters.verification);
  if (filters.search) params.append("search", filters.search);
  if (filters.page !== "1") params.append("page", filters.page);

  return params.toString() ? `./users?${params.toString()}` : "./users";
};

export const useUserFilters = () => {
  return useQueryFilters<UserFilters>({
    defaultFilters: defaultUserFilters,
    buildRouterURL: buildUserRouterURL,
    syncStrategy: "auto",
  });
};
