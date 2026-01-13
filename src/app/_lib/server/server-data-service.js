// For Server-side use
"use server";
import { cookies } from "next/headers";
import { createSessionClient } from "./appwrite.server";
import { redirect } from "next/navigation";
import { ID, Query } from "node-appwrite";

const dbID = String(process.env.NEXT_PUBLIC_DATABASE_ID);

const jobsCollections = "jobs-collections";
const logsCollection = "logs-collection";

export async function signOut() {
  const { account } = await createSessionClient();

  const cookieStore = await cookies();
  cookieStore.delete("appwrite_session");

  await account.deleteSession("current");

  redirect("/auth/signin");
}

/**
 * Fetches a jobs logs of a user
 * @param jobid
 * @returns Job logs
 */
export async function UserJobLogs(jobId) {
  const { tablesDB } = await createSessionClient();

  try {
    const res = await tablesDB.listRows({
      databaseId: dbID,
      tableId: logsCollection,
      queries: [Query.equal("jobId", jobId), Query.limit(200)],
    });

    // console.log(res);

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
  const { account, tablesDB } = await createSessionClient();
  try {
    const ownerId = (await account.get()).$id;
    const res = await tablesDB.listRows({
      databaseId: dbID,
      tableId: jobsCollections,
      queries: [Query.equal("ownerId", ownerId)],
    });

    // console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function createCronJob(name, url, method, cronExp, nextRun) {
  const { account, tablesDB } = await createSessionClient();

  try {
    const ownerId = (await account.get()).$id;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const result = await tablesDB.createRow({
      databaseId: dbID,
      tableId: jobsCollections,
      rowId: ID.unique(),
      data: {
        name,
        url,
        method,
        cronExp,
        ownerId,
        nextRun,
        timeZone: userTimeZone,
      },
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getJob(jobId) {
  const { tablesDB } = await createSessionClient();

  try {
    const result = await tablesDB.getRow({
      databaseId: dbID,
      tableId: jobsCollections,
      rowId: jobId,
    });

    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateJob(
  jobId,
  url,
  method,
  body = null,
  status,
  cronExp
) {
  const { tablesDB } = await createSessionClient();

  try {
    const data = {
      url,
      method,
      status,
      cronExp,
    };

    if (body !== null || body !== undefined) {
      data.body = body;
    }

    const result = await tablesDB.updateRow({
      databaseId: dbID,
      tableId: jobsCollections,
      rowId: jobId,
      data,
    });

    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
}

export async function deleteCronJob(rowid) {
  const { tablesDB } = await createSessionClient();

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
