import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js 16: `middleware` has been renamed to `proxy`.
 * Protects every /admin route except the login page.
 * Server-side authorization is additionally enforced in each
 * server action and admin layout — this is the first gate.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminArea =
    pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (isAdminArea && !request.cookies.get("archive-session")) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
