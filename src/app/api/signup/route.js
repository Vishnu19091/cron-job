import { NextResponse } from "next/server";
import { ID } from "appwrite";
import { createAdminClient } from "@/app/_lib/server/appwrite.server";

export async function POST(req) {
  const { name, email, password } = await req.json();

  try {
    const { account } = await createAdminClient();

    const user = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });

    return NextResponse.json(
      {
        userId: user.$id,
        message: "User account registered successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to register user",
        error: error.message,
      },
      { status: 400 }
    );
  }
}
