import { appwrite } from "./appwrite";
import { TablesDB, Query } from "appwrite";

const tablesDB = new TablesDB(appwrite);

const dbID = String(process.env.NEXT_PUBLIC_DATABASE_ID);

/**
 * Function to fetch all jobs of a user
 * @returns Jobs
 */
export async function FetchAllJobs() {
  try {
    const res = await tablesDB.listRows({
      databaseId: dbID,
      tableId: "jobs-collections",
      queries: [Query.select(["*"])],
    });
    console.log(res.rows);
    return res.rows;
  } catch (error) {
    return error;
  }
}

export async function FetchLogs() {
  try {
    const res = await tablesDB.listRows({
      databaseId: dbID,
      tableId: "logs-collection",
      queries: [Query.select(["*"])],
    });
  } catch (error) {
    return error;
  }
}
