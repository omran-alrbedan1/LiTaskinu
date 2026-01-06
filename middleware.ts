import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIES } from "@/lib/session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // ===== ADMIN ROUTES =====
  if (pathname.includes("/admin")) {
    const isAdminLogin = pathname.match(/^\/[a-z]{2}\/admin\/login$/i) || 
                         pathname === "/admin/login";

    if (isAdminLogin) {
      return NextResponse.next();
    }

    const adminSession = request.cookies.get(SESSION_COOKIES.ADMIN);

    if (!adminSession) {
      // Redirect to admin login with locale if present
      const localeMatch = pathname.match(/^\/([a-z]{2})\//i);
      const locale = localeMatch ? `/${localeMatch[1]}` : "";
      const loginUrl = new URL(`${locale}/admin/login`, request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // ===== USER/WEBSITE ROUTES =====
  const localeMatch = pathname.match(/^\/([a-z]{2})\//i);
  
  if (localeMatch) {
    const locale = localeMatch[1];
    
    const isPublicRoute = 
      pathname === `/${locale}/sign-in` ||
      pathname === `/${locale}/sign-up` ||
      pathname === `/${locale}/login` ||
      false;

    if (isPublicRoute) {
      return NextResponse.next();
    }

    const userSession = request.cookies.get(SESSION_COOKIES.USER);

    if (!userSession) {
      const loginUrl = new URL(`/${locale}/sign-in`, request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|api/).*)",
  ],
};