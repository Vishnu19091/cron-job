import { Query } from "node-appwrite";
import { getDatabases } from "./appwrite.js";
import { computeNextRun } from "./computeNextRun.js";
import {
  GetAllJobs,
  getDueJobs,
  InsertUserJobLog,
  updateJobMetaData,
} from "./db.js";
import { request } from "./request.js";

export async function runScheduler() {
  const now = new Date();

  const { documents: jobs } = await getDueJobs(now.toISOString());

  if (jobs.length === 0) {
    return;
  }

  for (const job of jobs) {
    let result;

    try {
      result = await request(job.url, job.method, job.body);

      const data = JSON.stringify(result.data);
      await InsertUserJobLog({
        jobId: job.$id,
        statusCode: result.statusCode,
        responseTime: result.durationMs,
        responseBody: data,
      });

      // To update the job's status MetaData based on statuscode received
      let setStatus = "disabled";
      if (result.statusCode >= 200 && result.statusCode <= 299) {
        setStatus = "active";
      } else if (result.statusCode >= 400 && result.statusCode <= 599) {
        setStatus = "failed";
      }

      const nextRun = computeNextRun({
        cronExp: job.cronExp,
        timeZone: job.timeZone,
        fromDate: now,
      });

      await updateJobMetaData({
        jobId: job.$id,
        lastRun: now,
        nextRun: nextRun,
        status: setStatus,
      });
    } catch (error) {
      await InsertUserJobLog({
        jobId: job.$id,
        statusCode: result?.statusCode ?? 0,
        responseTime: result?.durationMs ?? 0,
        responseBody: result?.data ?? null,
        error: error.message,
      });

      const retryRun = new Date(now);
      retryRun.setMinutes(retryRun.getMinutes() + 1);

      await updateJobMetaData({
        jobId: job.$id,
        lastRun: now,
        nextRun: retryRun,
        status: "failed",
      });
    }
  }
  return { message: "Scheduler Executed Successfully!" };
}

/**
 * This function handles removing the excess data
 * of a Job Logs, that is a **SINGLE JOB** can have only a **limit of 200 records**,
 * when a job logs reaches that limit, this function will remove the old records
 * from the database.
 */
export async function RemoveOldLogRecords() {
  const db = getDatabases();
  const databaseId = process.env.DATABASE_ID;
  const logsCollectionId = process.env.LOGS_COLLECTION_ID;

  if (!databaseId || !logsCollectionId) {
    throw new Error(
      `ENV MISSING → DATABASE_ID=${databaseId}, LOGS_COLLECTION_ID=${jobsCollectionId}`,
    );
  }

  const MAX_LIMIT = 150;

  const { documents: jobs } = await GetAllJobs();

  let arr = [];
  for (let job = 0; job < jobs.length; job++) {
    if (jobs[job].$id) arr.push(jobs[job].$id);
  }

  for (const jobId of arr) {
    const { total: count } = await db.listDocuments(
      databaseId,
      logsCollectionId,
      [Query.equal("jobId", `${jobId}`), Query.limit(1)],
    );

    if (count <= MAX_LIMIT) continue;
    let excess = count - MAX_LIMIT;

    while (excess > 0) {
      const limit = Math.min(excess, 100);

      const res = await db.listDocuments(databaseId, logsCollectionId, [
        Query.equal("jobId", jobId),
        Query.orderAsc("$createdAt"),
        Query.limit(limit),
      ]);

      if (res.documents.length === 0) break;

      await Promise.all(
        res.documents.map((doc) =>
          db.deleteDocument(databaseId, logsCollectionId, doc.$id),
        ),
      );

      excess -= res.documents.length;
    }
  }

  return { message: "Old job logs cleaned successfully" };
}
