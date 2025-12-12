// Server-side use
import { Client, Account, Databases } from "node-appwrite";

export function getServerAppwriteClient(jwt) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setJWT(jwt); // authenticate using Appwrite JWT

  return {
    accountSC: new Account(client),
  };
}
