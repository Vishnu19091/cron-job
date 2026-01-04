import { getDueJobs, InsertUserJobLog, updateJobMetaData } from "./db.js";
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

      const nextRun = new Date(now);
      nextRun.setMinutes(nextRun.getMinutes() + 15);

      await updateJobMetaData({
        jobId: job.$id,
        lastRun: now,
        nextRun: nextRun,
        status: "active",
      });
    } catch (error) {
      await InsertUserJobLog({
        jobId: job.$id,
        statusCode: result.statusCode,
        responseTime: result.durationMs,
        responseBody: result.data,
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
}
