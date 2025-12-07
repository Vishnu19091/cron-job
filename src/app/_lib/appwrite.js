import { Account, Client, TablesDB } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
const account = new Account(client);

const tablesDB = new TablesDB(client);

export { account, tablesDB };
