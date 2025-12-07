import { account, tablesDB } from "./appwrite";
import { Query } from "appwrite";

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
 * Fetches currently logged in user details
 * @returns user data
 */
export async function getUser() {
  try {
    const user = await account.get();
    console.log(user);
    return user;
  } catch (error) {
    throw new Error(error);
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

    console.log("User jobs", res);
    return res;
  } catch (error) {
    console.error(error);
  }
}
