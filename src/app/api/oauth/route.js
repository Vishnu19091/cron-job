import { createAdminClient } from "@/app/_lib/server/appwrite.server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * This route handles the OAuth successful redirection,
 
 * and also sets session for the OAuth users,
 
 * and redirects to /dashboard
 * @param {*} request
 * @returns
 */
export async function GET(request) {
  const { account } = await createAdminClient();

  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const secret = request.nextUrl.searchParams.get("secret");

    // console.log({
    //   userID: userId,
    //   secret: secret,
    // });
    const ORIGIN = request.nextUrl.origin;

    const session = await account.createSession({ userId, secret });

    const cookieStore = await cookies();
    cookieStore.set("appwrite_session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(session.expire),
      secure: true,
    });

    return NextResponse.redirect(`${ORIGIN}/dashboard`);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
