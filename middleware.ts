import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { LOCALES, DEFAULT_LOCALE, SESSION_COOKIES, type AppLocale } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always", // ✅ force locale in all urls
});

function getLocaleFromPathname(pathname: string): AppLocale | null {
  const first = pathname.split("/")[1];
  return (LOCALES as readonly string[]).includes(first) ? (first as AppLocale) : null;
}

function isPublicRoute(pathname: string, locale: AppLocale) {
  const base = `/${locale}`;
  return (
    pathname === `${base}/sign-in` ||
    pathname === `${base}/sign-up` ||
    pathname === `${base}/login` ||
    pathname === `${base}/otp-verification`
  );
}

function isAdminLoginPath(pathname: string, locale: AppLocale | null) {
  return (
    pathname === "/admin/login" ||
    (locale ? pathname === `/${locale}/admin/login` : false)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ignore API
  if (pathname.startsWith("/api/")) return NextResponse.next();

  // run next-intl
  const intlResponse = intlMiddleware(request);
  const locale = getLocaleFromPathname(pathname);

  // If locale is missing, next-intl will redirect to /{defaultLocale}/...
  // so just return its response.
  if (!locale) return intlResponse;

  // ===== Admin =====
  if (pathname.includes("/admin")) {
    if (isAdminLoginPath(pathname, locale)) return intlResponse;

    const adminCookie = request.cookies.get(SESSION_COOKIES.ADMIN)?.value;
    if (!adminCookie) {
      const url = new URL(`/${locale}/admin/login`, request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    return intlResponse;
  }

  // ===== Website/User =====
  // ✅ allow public pages without session (prevents /sign-in redirect loop)
  if (isPublicRoute(pathname, locale)) return intlResponse;

  const userCookie = request.cookies.get(SESSION_COOKIES.USER)?.value;
  if (!userCookie) {
    const url = new URL(`/${locale}/sign-in`, request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
