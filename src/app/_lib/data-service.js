// For Client-side use Appwrite Web SDK

import { account, tablesDB } from "./appwrite";
import { ID, Query } from "appwrite";
import { redirect } from "next/navigation";

const dbID = String(process.env.NEXT_PUBLIC_DATABASE_ID);

const jobsCollections = "jobs-collections";
const logsCollection = "logs-collection";

/**
 * Fetches a jobs logs of a user
 * @param jobid
 * @returns Job logs
 */
export async function UserJobLogs(jobId) {
  try {
    const res = await tablesDB.listRows({
      databaseId: dbID,
      tableId: logsCollection,
      queries: [Query.equal("jobId", jobId)],
    });

    return res.rows; // return only rows
  } catch (error) {
    console.error(error);
    return []; // safe fallback
  }
}

/**
 * Function to fetch all jobs of a user
 * @returns Jobs
 */
export async function getUserJobs() {
  try {
    const ownerId = (await account.get()).$id;
    const res = await tablesDB.listRows({
      databaseId: dbID,
      tableId: jobsCollections,
      queries: [Query.equal("ownerId", ownerId)],
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function createCronJob(name, url, method, schedule) {
  try {
    const ownerId = (await account.get()).$id;
    const result = await tablesDB.createRow({
      databaseId: dbID,
      tableId: jobsCollections,
      rowId: ID.unique(),
      data: {
        name,
        url,
        method,
        schedule,
        ownerId,
      },
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCronJob(rowid) {
  try {
    const result = await tablesDB.deleteRow({
      databaseId: dbID,
      tableId: jobsCollections,
      rowId: rowid,
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}
