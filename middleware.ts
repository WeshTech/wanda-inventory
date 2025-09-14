// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Route configs
export const PUBLICROUTES = ["/"];
export const AUTHROUTES = ["/auth/login", "/auth/register"];
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

// Middleware
export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("secure_access_token")?.value;
  const refreshToken = req.cookies.get("secure_refresh_token")?.value;
  const sessionToken = req.cookies.get("secure_token")?.value;

  const { pathname } = req.nextUrl;

  const isPublicRoute = PUBLICROUTES.some((route) => pathname === route);
  const isAuthRoute = AUTHROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = !isPublicRoute && !isAuthRoute;

  // ✅ If already logged in, block access to /auth routes
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  // ✅ Handle missing access token but valid refresh+session for protected routes
  if (
    !accessToken &&
    refreshToken &&
    sessionToken &&
    pathname.startsWith("/dashboard")
  ) {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

    try {
      const refreshResponse = await fetch(`${backendUrl}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { cookie: req.headers.get("cookie") || "" },
      });

      if (refreshResponse.ok) {
        const newResponse = NextResponse.next();

        // Copy refreshed cookies from backend
        refreshResponse.headers.forEach((value, key) => {
          if (key.toLowerCase() === "set-cookie") {
            newResponse.headers.append("set-cookie", value);
          }
        });

        return newResponse;
      } else {
        // Refresh failed → redirect to login
        const response = NextResponse.redirect(new URL("/auth/login", req.url));
        response.cookies.delete("secure_token");
        response.cookies.delete("secure_refresh_token");
        return response;
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // ✅ Block protected routes without valid session
  if (isProtectedRoute && (!accessToken || !sessionToken)) {
    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.delete("secure_token");
    return response;
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
