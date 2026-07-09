import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/auth/admin";

const PANEL_PREFIX = "/adminJiwa/";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const isAuthenticated = isValidAdminSession(token);

  if (pathname === "/adminJiwa") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/adminJiwa/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith(PANEL_PREFIX)) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/adminJiwa", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminJiwa", "/adminJiwa/:path*"],
};
