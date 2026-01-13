import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { SESSION_COOKIES } from "@/lib/session";

const intlMiddleware = createIntlMiddleware(routing);

function getLocaleFromPathname(pathname: string) {
  const locales = routing.locales ?? [];
  const first = pathname.split("/")[1];
  return locales.includes(first) ? first : null;
}

function isAdminLoginPath(pathname: string) {
  // Matches:
  // /admin/login
  // /en/admin/login, /ar/admin/login, etc.
  return /^\/(?:[a-z]{2}\/)?admin\/login\/?$/i.test(pathname);
}

function isAdminPath(pathname: string) {
  // /admin/... or /{locale}/admin/...
  return /^\/(?:[a-z]{2}\/)?admin(?:\/|$)/i.test(pathname);
}

function isPublicUserRoute(pathname: string, locale: string) {
  const base = `/${locale}`;
  return (
    pathname === `${base}/sign-in` ||
    pathname === `${base}/sign-up` ||
    pathname === `${base}/login` ||
    pathname === `${base}/otp-verification`
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never touch API routes in middleware
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Let next-intl do its job (may rewrite/redirect to add locale)
  const intlResponse = intlMiddleware(request);

  // Determine locale (from URL after intlMiddleware potentially rewrote path)
  // Note: request.nextUrl.pathname is unchanged; we parse from the original pathname.
  const locale = getLocaleFromPathname(pathname);

  // ===== ADMIN ROUTES =====
  if (isAdminPath(pathname)) {
    if (isAdminLoginPath(pathname)) {
      return intlResponse;
    }

    const adminSession = request.cookies.get(SESSION_COOKIES.ADMIN);

    if (!adminSession) {
      const loginPath = `${locale ? `/${locale}` : ""}/admin/login`;
      const loginUrl = new URL(loginPath, request.url);
      loginUrl.searchParams.set("from", pathname);

      // Preserve headers/cookies set by next-intl
      const redirect = NextResponse.redirect(loginUrl);
      intlResponse.headers.forEach((value, key) => redirect.headers.set(key, value));
      return redirect;
    }

    return intlResponse;
  }

  // ===== USER/WEBSITE ROUTES =====
  if (locale) {
    if (isPublicUserRoute(pathname, locale)) {
      return intlResponse;
    }

    const userSession = request.cookies.get(SESSION_COOKIES.USER);

    if (!userSession) {
      const loginUrl = new URL(`/${locale}/sign-in`, request.url);
      loginUrl.searchParams.set("from", pathname);

      const redirect = NextResponse.redirect(loginUrl);
      intlResponse.headers.forEach((value, key) => redirect.headers.set(key, value));
      return redirect;
    }

    return intlResponse;
  }

  // If no locale in path, next-intl may redirect/rewrite — keep its result.
  return intlResponse;
}

export const config = {
  matcher: [
    // Run on all routes except Next internals / static files
    "/((?!api|_next|.*\\..*).*)"
  ],
};
