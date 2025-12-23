// Server-side use
"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite_session");

  if (!session || !session.value) {
    return null;
  }

  if (session.value) client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  // Get the session cookie from the request
  const sessionCookie = (await cookies()).get("appwrite_session"); // The name might vary

  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  // Manually set the session cookie on the client for server-side requests
  if (sessionCookie.value) client.setSession(sessionCookie.value);

  const account = new Account(client);

  const identities = await account?.listIdentities();

  const googleIdentity = identities.identities.find(
    (i) => i.provider === "google"
  );

  let avatar = null;

  if (googleIdentity?.providerAccessToken) {
    try {
      avatar = await getGoogleProfilePhoto(googleIdentity.providerAccessToken);
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const user = await account.get();
    return { ...user, avatar };
  } catch (error) {
    console.error("Failed to get user -> ", error);
    return error;
  }
}

/** Fetches OAuth Google users PFP [GoogleAPI](https://people.googleapis.com)
 * @param {*} providerAccessToken
 * @returns User_PFP_URL
 */
async function getGoogleProfilePhoto(providerAccessToken) {
  const res = await fetch(
    "https://people.googleapis.com/v1/people/me?personFields=photos",
    {
      headers: {
        Authorization: `Bearer ${providerAccessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Google user profile picture");
  }

  const data = await res.json();

  return data.photos?.[0]?.url || null;
}
