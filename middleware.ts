// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("session")?.value;

  if (pathname.startsWith("/admin/en/") && !pathname.endsWith("/login")) {
    if (!sessionToken) {
      console.log(
        "Redirecting to login - accessing admin route without session"
      );
      const loginUrl = new URL("/admin/en/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/admin/api/")) {
    if (!sessionToken) {
      console.log("Blocking API access - no session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (pathname.endsWith("/admin/en/login") && sessionToken) {
    console.log("Redirecting to dashboard - already logged in");
    const dashboardUrl = new URL("/admin/en/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/en/:path*", "/admin/api/:path*"],
};
