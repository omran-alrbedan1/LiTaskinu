"use client";

import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import { LANGUAGE_OPTIONS } from "@/constants/options";

export const useNavigation = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = locale || "en";

  const normalizePath = (path: string) => {
    if (!path) return "/";
    return path.replace(/\/$/, "") || "/";
  };

  // Get path without locale prefix
  const getPathWithoutLocale = useCallback(() => {
    if (!pathname) return "/";
    
    let pathWithoutLocale = pathname;
    LANGUAGE_OPTIONS.forEach((option) => {
      const localeRegex = new RegExp(`^/${option.value}(/|$)`);
      if (localeRegex.test(pathname)) {
        pathWithoutLocale = pathname.replace(localeRegex, "/");
      }
    });
    
    return normalizePath(pathWithoutLocale);
  }, [pathname]);

  const isActiveLink = useCallback(
    (linkPath: string): boolean => {
      if (!pathname) return false;

      const normalizedLinkPath = normalizePath(linkPath);
      const currentPath = getPathWithoutLocale();

      // Remove leading slash for comparison
      const cleanLinkPath = normalizedLinkPath.replace(/^\//, "");
      const cleanCurrentPath = currentPath.replace(/^\//, "");

      // Exact match
      if (cleanCurrentPath === cleanLinkPath) return true;
      
      // Starts with (for nested routes)
      if (cleanLinkPath && cleanCurrentPath.startsWith(`${cleanLinkPath}/`)) return true;
      
      // Home page check
      return (cleanLinkPath === "" || cleanLinkPath === "home") && cleanCurrentPath === "";
    },
    [pathname, getPathWithoutLocale]
  );

  const getLocalizedPath = useCallback(
    (path: string) => {
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      return `/${currentLocale}/${cleanPath}`.replace(/\/\/+/g, "/");
    },
    [currentLocale]
  );

  const changeLanguage = useCallback(
    (newLocale: string) => {
      if (!pathname) return;

      const currentPath = getPathWithoutLocale();
      const newPath = `/${newLocale}${currentPath === "/" ? "" : currentPath}`;
      
      router.push(newPath);
    },
    [pathname, router, getPathWithoutLocale]
  );

  return {
    currentLocale,
    pathname,
    router,
    isActiveLink,
    getLocalizedPath,
    changeLanguage,
  };
};