import { Client, Databases } from "node-appwrite";

export function getDatabases() {
  // uses LegacyAPI for DB
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  return new Databases(client);
}
