import { Query } from "node-appwrite";
import { getDatabases } from "./appwrite.js";
import { serializeResponseBody } from "./serializeResponse.js";

/**
 * Fetches all DueJobs from DB
 * @returns
 */
export async function getDueJobs(nowISO) {
  const databaseId = process.env.DATABASE_ID;
  const jobsCollectionId = process.env.JOBS_COLLECTION_ID;

  if (!databaseId || !jobsCollectionId) {
    throw new Error(
      `ENV MISSING → DATABASE_ID=${databaseId}, JOBS_COLLECTION_ID=${jobsCollectionId}`
    );
  }
  const db = getDatabases();

  return await db.listDocuments(databaseId, jobsCollectionId, [
    Query.equal("status", "active"),
    Query.lessThanEqual("nextRun", nowISO),
    Query.orderAsc("nextRun"),
  ]);
}

/**
 * Inserts a new record of a Job,
 * once making request to a URL is completed
 * @param {*} ownerId
 * @param {*} jobId
 * @returns InsertUserJobLog
 */
export async function InsertUserJobLog({
  jobId,
  statusCode,
  responseTime,
  responseBody,
  error,
}) {
  const databaseId = process.env.DATABASE_ID;
  const logsCollectionId = process.env.LOGS_COLLECTION_ID;

  if (
    !databaseId ||
    !logsCollectionId ||
    !jobId ||
    typeof responseTime !== "number" ||
    typeof statusCode !== "number"
  ) {
    throw new Error(
      `INVALID LOG INPUT → jobId=${jobId}, responseTime=${responseTime}, statusCode=${statusCode}`
    );
  }

  const db = getDatabases();

  return await db.createDocument(databaseId, logsCollectionId, "unique()", {
    jobId, // relationship → document ID
    statusCode, // MUST be integer
    responseTime, // MUST be integer
    success: !error, // REQUIRED boolean
    responseBody: serializeResponseBody(responseBody) ?? null,
    error: error ?? null,
  });
}

/**
 * This Function updates MetaData of a Job
 * it just simply updates lastRun & nextRun column of user Job
 * @param {*} ownerId
 * @param {*} jobId
 */
export async function updateJobMetaData({ jobId, lastRun, nextRun, status }) {
  const databaseId = process.env.DATABASE_ID;
  const jobsCollectionId = process.env.JOBS_COLLECTION_ID;

  const db = getDatabases();

  return await db.updateDocument(databaseId, jobsCollectionId, jobId, {
    lastRun,
    nextRun,
    status,
  });
}
