// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";
// import { SESSION_COOKIES } from "@/lib/session";

// const secretKey = process.env.SESSION_SECRET_KEY!;
// const encodedKey = new TextEncoder().encode(secretKey);

// async function verifySession(cookieValue: string) {
//   try {
//     const { payload } = await jwtVerify(cookieValue, encodedKey, {
//       algorithms: ["HS256"],
//     });
//     return payload;
//   } catch (error) {
//     return null;
//   }
// }

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const publicRoutes = [
//     "/forgot-password",
//     "/otp-verification",
//     "/parent-info",
//     "/reset-password",
//     "/sign-in",
//     "/sign-up",
//     "/verify-reset-code",
//     "/login",
//     "/api/website/signin",
//     "/api/website/signup",
//     "/api/website/forgot-password",
//     "/api/website/reset-password",
//     "/api/website/verify-email",
//     "/api/website/verify-otp",
//     "/api/admin/login",
//   ];

//   // Helper function to check if path is public
//   const isPublicRoute = (path: string) => {
//     // Check exact matches
//     if (publicRoutes.includes(path)) {
//       return true;
//     }

//     // Check with any locale prefix
//     for (const route of publicRoutes) {
//       // For user routes
//       if (path === `/en${route}` || path.startsWith(`/en${route}/`)) {
//         return true;
//       }
//       // For admin routes
//       if (
//         path === `/admin/en${route}` ||
//         path.startsWith(`/admin/en${route}/`)
//       ) {
//         return true;
//       }
//     }

//     return false;
//   };

//   // Check if current path is public
//   if (isPublicRoute(pathname)) {
//     return NextResponse.next();
//   }

//   // === ADMIN ROUTES PROTECTION ===
//   if (pathname.startsWith("/admin/")) {
//     const adminSessionToken = request.cookies.get(SESSION_COOKIES.ADMIN)?.value;

//     // If no admin session and trying to access admin routes
//     if (!adminSessionToken) {
//       console.log("Redirecting to admin login - no admin session");
//       const loginUrl = new URL("/admin/en/login", request.url);
//       loginUrl.searchParams.set("from", pathname);
//       return NextResponse.redirect(loginUrl);
//     }

//     // Verify admin session
//     const session = await verifySession(adminSessionToken);
//     if (!session) {
//       console.log("Invalid admin session, redirecting to login");
//       const response = NextResponse.redirect(
//         new URL("/admin/en/login", request.url)
//       );
//       response.cookies.delete(SESSION_COOKIES.ADMIN);
//       return response;
//     }

//     if (!session.isAdmin) {
//       console.log("User doesn't have admin role, redirecting");
//       const response = NextResponse.redirect(new URL("/en", request.url));
//       response.cookies.delete(SESSION_COOKIES.ADMIN);
//       return response;
//     }

//     // If trying to access admin login while already logged in
//     if (pathname === "/admin/en/login" || pathname === "/admin/login") {
//       console.log("Already logged in as admin, redirecting to dashboard");
//       return NextResponse.redirect(new URL("/admin/en/dashboard", request.url));
//     }

//     return NextResponse.next();
//   }

//   // === USER ROUTES PROTECTION ===
//   if (pathname.startsWith("/en/") && !pathname.startsWith("/en/sign-in")) {
//     const userSessionToken = request.cookies.get(SESSION_COOKIES.USER)?.value;

//     // Skip protection for login page itself
//     if (pathname === "/en/sign-in") {
//       return NextResponse.next();
//     }

//     // If no user session and trying to access protected user routes
//     if (!userSessionToken) {
//       console.log("Redirecting to user login - no user session");
//       const loginUrl = new URL("/en/sign-in", request.url);
//       loginUrl.searchParams.set("from", pathname);
//       return NextResponse.redirect(loginUrl);
//     }

//     // Verify user session
//     const session = await verifySession(userSessionToken);
//     if (!session) {
//       console.log("Invalid user session, redirecting to login");
//       const response = NextResponse.redirect(new URL("/en/login", request.url));
//       response.cookies.delete(SESSION_COOKIES.USER);
//       return response;
//     }

//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/en/:path*",
//     "/api/admin/:path*",
//     "/api/user/:path*",
//     "/api/ads/:path*",
//     // Exclude static files and API routes
//     "/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)",
//   ],
// };


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
