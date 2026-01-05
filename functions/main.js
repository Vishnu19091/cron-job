import { getDueJobs, InsertUserJobLog, updateJobMetaData } from "./lib/db.js";
import { request } from "./lib/request.js";
import { runScheduler } from "./lib/scheduler.js";

export default async function ({ req, res, log, error }) {
  let payload = {};

  if (req.body) {
    payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }

  if (req.path === process.env.INSERT_LOG && req.method === "POST") {
    const { jobId, statusCode, responseTime, responseBody } = payload;

    const logDoc = await InsertUserJobLog({
      jobId,
      statusCode,
      responseTime,
      responseBody,
    });

    return res.json({
      message: "Success!",
      bodySent: { jobId, statusCode, responseTime, responseBody },
      response: logDoc,
    });
  }

  if (req.path === process.env.UPDATE_META_DATA && req.method === "POST") {
    const { jobId, lastRun, nextRun, status } = payload;

    const logDoc = await updateJobMetaData({ jobId, lastRun, nextRun, status });

    return res.json({
      message: "Successfully Updated Job MetaData!",
      bodySent: { jobId, lastRun, nextRun, status },
      response: logDoc,
    });
  }

  if (req.path === process.env.REQUEST_URL && req.method === "POST") {
    const { url, method, body } = payload;

    const DocData = await request(url, method, body);

    return res.json({ DocData });
  }

  // if (req.path === "/duej" && req.method === "GET") {
  //   const now = new Date().toISOString();
  //   const { documents: jobs } = await getDueJobs(now);
  //   log(jobs.length);

  //   return res.json({ jobs });
  // }

  await runScheduler();
  return res.json({ ok: true });
}
