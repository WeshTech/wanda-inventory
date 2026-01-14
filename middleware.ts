import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Route configs
export const PUBLIC_ROUTES = ["/", "/sitemap.xml", "/robots.txt", "/pricing"];
export const AUTH_ROUTES = ["/auth/login", "/auth/register"];
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"; // where logged-in users go
export const DEFAULT_LOGOUT_REDIRECT = "/auth/login"; // where logged-out users go

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(
    process.env.NODE_ENV === "production"
      ? "__Wanda-Secure-Access-Token"
      : "secure_access_token"
  )?.value;
  const refreshToken = req.cookies.get(
    process.env.NODE_ENV === "production"
      ? "__Wanda-Secure-Refresh-Token"
      : "secure_refresh_token"
  )?.value;
  const sessionToken = req.cookies.get(
    process.env.NODE_ENV === "production"
      ? "__Wanda-Secure-Token"
      : "secure_token"
  )?.value;

  // console.log("Middleware cookies =>", {
  //   accessToken: accessToken || "missing",
  //   refreshToken: refreshToken || "missing",
  //   sessionToken: sessionToken || "missing",
  // });

  const { pathname } = req.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = !isPublicRoute && !isAuthRoute;

  const isLoggedIn =
    (!!accessToken && !!sessionToken) || (!!refreshToken && !!sessionToken);

  //allow all the public routes access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from auth routes
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  // Handle protected routes
  if (isProtectedRoute) {
    if (isLoggedIn) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(DEFAULT_LOGOUT_REDIRECT, req.url));
  }

  // Default: allow anything else
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/sitemap.xml",
  ],
};
