// lib/client-session.ts
"use client";

import { Session } from "./session";

/**
 * حفظ الـ Session في localStorage (للاستخدام في الـ Client فقط)
 */
export const saveSessionToStorage = (session: Session, type: "admin" | "user" = "admin") => {
  if (typeof window === 'undefined') return;
  
  try {
    const key = type === "admin" ? "admin_session" : "user_session";
    localStorage.setItem(key, JSON.stringify(session));
  } catch (error) {
    console.error("خطأ في حفظ الجلسة:", error);
  }
};

/**
 * قراءة الـ Session من localStorage
 */
export const getSessionFromStorage = (type: "admin" | "user" = "admin"): Session | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const key = type === "admin" ? "admin_session" : "user_session";
    const sessionStr = localStorage.getItem(key);
    
    if (sessionStr) {
      return JSON.parse(sessionStr);
    }
  } catch (error) {
    console.error("خطأ في قراءة الجلسة:", error);
  }
  
  return null;
};

/**
 * حذف الـ Session من localStorage
 */
export const deleteSessionFromStorage = (type?: "admin" | "user") => {
  if (typeof window === 'undefined') return;
  
  if (type === "admin") {
    localStorage.removeItem("admin_session");
  } else if (type === "user") {
    localStorage.removeItem("user_session");
  } else {
    localStorage.removeItem("admin_session");
    localStorage.removeItem("user_session");
  }
};

/**
 * جلب access token من الـ Session
 */
export const getAccessToken = (type: "admin" | "user" = "admin"): string => {
  const session = getSessionFromStorage(type);
  return session?.accessToken || "";
};

/**
 * التحقق من وجود جلسة نشطة
 */
export const isAuthenticated = (type: "admin" | "user" = "admin"): boolean => {
  const session = getSessionFromStorage(type);
  return !!session?.accessToken;
};

/**
 * توجيه إلى صفحة الدخول إذا لم يكن هناك جلسة
 */
export const requireAuth = (type: "admin" | "user" = "admin", redirectUrl?: string) => {
  if (typeof window === 'undefined') return false;
  
  if (!isAuthenticated(type)) {
    const defaultRedirect = type === "admin" ? "/admin/login" : "/login";
    window.location.href = redirectUrl || defaultRedirect;
    return false;
  }
  
  return true;
};