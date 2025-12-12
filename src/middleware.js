import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // 1. CHECK GOOGLE LOGIN (NextAuth)
  const nextAuthSession = await auth();
  if (nextAuthSession?.user) {
    return NextResponse.next();
  }

  // 2. CHECK APPWRITE LOGIN
  const appwriteCookie = request.cookies.get("appwrite_jwt");

  if (appwriteCookie?.value) {
    return NextResponse.next();
  }

  // 3.IF USER IS NOT LOGGED IN → redirect to SignIn Page
  return NextResponse.redirect(new URL("/auth/signin", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings", "/jobs/:path*"],
};
