import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/app/_lib/server/appwrite.server";

/**
 * Fetches currently logged in user details

 * @returns user data
 */
export async function GET() {
  const user = await getLoggedInUser();
  if (user) return NextResponse.json(user);

  return NextResponse.json(
    { error: "Unauthorized!", message: "User is not logged in!" },
    { status: 401 }
  );
}
