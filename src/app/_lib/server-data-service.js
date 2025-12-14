// For Server-side use
import { cookies } from "next/headers";
import { getServerAppwriteClient } from "./appwrite.server";
import { auth } from "@/auth";

// Helper to read cookies in a server function
async function getJwtCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("appwrite_jwt")?.value ?? null;
}

/**
 * Fetches currently logged in user details
 
 *  Unified user fetch Google OAuth and Appwrite
 
 * @returns user data
 */
export async function getUser() {
  // ------------- Google OAuth Session -------------
  const nextAuthSession = await auth();

  if (nextAuthSession?.user) {
    return {
      name: nextAuthSession.user.name,
      email: nextAuthSession.user.email,
      avatar: nextAuthSession.user.image,
      provider: "Google",
    };
  }

  // ------------- AppWrite Session -------------
  const jwt = await getJwtCookie();
  if (jwt)
    try {
      const { accountSC } = getServerAppwriteClient(jwt);
      const user = await accountSC.get();
      return {
        name: user.name,
        email: user.email,
        avatar: null,
        provider: "AppWrite",
      };
    } catch (error) {
      throw new Error("From AppWrite", error);
    }

  // for no user
  return null;
}
