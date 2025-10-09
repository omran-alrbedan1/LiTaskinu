import { useLocale } from "next-intl";

// src/utils/breadcrumbs.ts (enhanced version)
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
  icon?: string;
}

export const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const locale = useLocale();
  const cleanPathname = pathname.split("?")[0];
  const paths = cleanPathname
    .split("/")
    .filter((path) => path && path !== "admin");

  // Remove locale if present
  const localeIndex = paths.findIndex((path) => ["en", "ar"].includes(path));
  if (localeIndex !== -1) {
    paths.splice(localeIndex, 1);
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Dashboard",
      href: `/admin/${locale}/dashboard`,
    },
  ];

  const labelMap: { [key: string]: string } = {
    dashboard: "Overview",
    notifications: "Notifications",
    users: "User Management",
    "user-management": "User Management",
    verification: "Verification",
    complaints: "Complaints",
    "marriage-requests": "Marriage Requests",
    chats: "Chat Management",
    analytics: "Analytics",
    settings: "Settings",
    profile: "Profile",
    security: "Security",
    reports: "Reports",
  };

  let currentPath = "/";

  paths.forEach((path, index) => {
    const isLast = index === paths.length - 1;
    currentPath += `/${path}`;

    let label =
      labelMap[path] ||
      path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    breadcrumbs.push({
      label,
      href: isLast ? undefined : `/admin/${locale}/${currentPath}`,
      isCurrent: isLast,
    });
  });

  return breadcrumbs;
};
