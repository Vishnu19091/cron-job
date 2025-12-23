// For Server-side use
"use server";
import { cookies } from "next/headers";
import { createSessionClient } from "./server/appwrite.server";
import { redirect } from "next/navigation";

export async function signOut() {
  const { account } = await createSessionClient();

  const cookieStore = await cookies();
  cookieStore.delete("appwrite_session");

  await account.deleteSession("current");

  redirect("/auth/signin");
}
