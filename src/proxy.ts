import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  //   "/dashboard",
  "/clients",
  "/orders",
  "/services",
  "/product-items",
  "/content",
];
const publicOnlyRoutes = [
  "/login",
  "/forget-password",
  "/verify-otp",
  "/reset-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;
  console.log(token);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPublicOnlyRoute = publicOnlyRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // no token → redirect to login
  if (!token && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // has token → can't visit login/auth pages
  if (token && isPublicOnlyRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
