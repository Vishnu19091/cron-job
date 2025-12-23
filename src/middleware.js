import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/app/_lib/server/appwrite.server";

const protectedRoutes = ["/dashboard", "/settings", "/jobs", "/api/user"];

const publicRoutes = ["/", "/auth/signup", "/auth/signin"];
export async function middleware(request) {
  // Get the request path
  const path = request.nextUrl.pathname;

  // Stores Boolean value and also determines protected sub-routes
  const isProtectedRoute =
    protectedRoutes.includes(path) ||
    protectedRoutes.some((route) => path.startsWith(route.replace("*", "")));

  // Stores Boolean value
  const isPublicRoute = publicRoutes.includes(path);

  const user = await getLoggedInUser();
  // console.log("Middleware ran and user details ->", user);

  // // Redirect to login if accessing a protected route without a user
  if (isProtectedRoute && !user?.$id) {
    return NextResponse.redirect(new URL("/auth/signin", request.nextUrl));
  }

  // // Redirect to dashboard if already logged in and trying to access a public auth page
  if (isPublicRoute && user?.$id && !path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

// Specify the paths where the middleware should run (optional, but good for performance)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
