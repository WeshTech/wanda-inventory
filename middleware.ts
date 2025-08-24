// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const PUBLICROUTES = ["/"];
export const AUTHROUTES = ["/auth/login", "/auth/register"];
export const DEFAULT_LOGIN_REDIRECT = "/";

// Middleware
export function middleware(req: NextRequest) {
  const token = req.cookies.get("secure_access_token")?.value;
  const { pathname } = req.nextUrl;

  const isPublicRoute = PUBLICROUTES.some((route) => pathname === route);
  const isAuthRoute = AUTHROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = !isPublicRoute && !isAuthRoute;

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
