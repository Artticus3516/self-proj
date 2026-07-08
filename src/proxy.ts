import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect admin routes except login page and its resources
  if ((path === "/admin" || path.startsWith("/admin/")) && path !== "/admin/login") {
    const sessionCookie = request.cookies.get("admin_session")?.value;
    if (sessionCookie !== "mock-session-token-xyz-9876") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
