import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/app/_lib/server/appwrite.server";

export async function POST(req) {
  // console.log(await req.json());
  const { email, password } = await req.json();

  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    // console.log(session);
    (await cookies()).set("appwrite_session", session?.secret, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
      path: "/",
    });

    return NextResponse.json(
      { message: "Sucessfully Signed in" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Sign In!", error: error },
      { status: 401 }
    );
  }
}
