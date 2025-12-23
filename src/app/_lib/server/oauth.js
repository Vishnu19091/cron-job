"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Account, Client, OAuthProvider } from "node-appwrite";

export async function continueWithGoogle() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const account = new Account(client);

  const incomingHeaders = await headers();

  const origin = incomingHeaders.get("origin");

  const redirectUrl = await account.createOAuth2Token({
    provider: OAuthProvider.Google,
    success: `${origin}/api/oauth`,
    failure: `${origin}/auth/signin`,
  });

  return redirect(redirectUrl);
}
