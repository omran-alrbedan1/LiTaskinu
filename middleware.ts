import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIES } from "@/lib/session";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const response = intlMiddleware(request);

  // ===== ADMIN ROUTES =====
  if (pathname.includes("/admin")) {
    const isAdminLogin = pathname.match(/^\/[a-z]{2}\/admin\/login$/i) || 
                         pathname === "/admin/login";

    if (isAdminLogin) {
      return response;
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

    return response;
  }

  // ===== USER/WEBSITE ROUTES =====
  const localeMatch = pathname.match(/^\/([a-z]{2})\//i);
  
  if (localeMatch) {
    const locale = localeMatch[1];
    
    const isPublicRoute = 
      pathname === `/${locale}/sign-in` ||
      pathname === `/${locale}/sign-up` ||
      pathname === `/${locale}/login` ||
      pathname === `/${locale}/otp-verification` ||
      false;

    if (isPublicRoute) {
      return response;
    }

    const userSession = request.cookies.get(SESSION_COOKIES.USER);

    if (!userSession) {
      const loginUrl = new URL(`/${locale}/sign-in`, request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public/).*)",
    "/(ar|en|tr|es|fr|zh|fa|ru)/:path*"
  ],
};
