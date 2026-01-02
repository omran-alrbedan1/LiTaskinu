

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIES } from "@/lib/session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ===== ADMIN ROUTES =====
  if (pathname.startsWith("/admin")) {
    // السماح بصفحات تسجيل الدخول
    if (
      pathname === "/admin/login" ||
      pathname === "/admin/en/login"
    ) {
      return NextResponse.next();
    }

    // تحقق سريع: هل يوجد cookie؟
    const adminSession = request.cookies.get(SESSION_COOKIES.ADMIN);

    if (!adminSession) {
      const loginUrl = new URL("/admin/en/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // يوجد cookie → نسمح بالمرور
    return NextResponse.next();
  }

  // ===== USER ROUTES =====
  if (pathname.startsWith("/en")) {
    // صفحات عامة
    if (
      pathname.startsWith("/en") ||
      pathname.startsWith("/en/login") ||
      pathname.startsWith("/en/sign-in") ||
      pathname.startsWith("/en/sign-up")
    ) {
      return NextResponse.next();
    }

    const userSession = request.cookies.get(SESSION_COOKIES.USER);

    if (!userSession) {
      const loginUrl = new URL("/en/sign-in", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // باقي المسارات
  return NextResponse.next();
}
