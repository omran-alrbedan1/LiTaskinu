export const buildQueryParams = (filters: UserFilters): URLSearchParams => {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.verification) params.append("verification", filters.verification);
  if (filters.search) params.append("search", filters.search);
  params.append("page", filters.page);
  params.append("pageSize", filters.pageSize);
  return params;
};

export const buildURL = (filters: UserFilters): string => {
  const params = buildQueryParams(filters);
  return `/api/admin/users?${params.toString()}`;
};
