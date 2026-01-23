import { getJob, UserJobLogs } from "@/app/_lib/server/server-data-service";
import LogsTable from "./LogsTable";
import styles from "./page.module.css";
import "./page.css";
import JobName from "./jobname";
import Link from "next/link";

export default async function Logs({ params, searchParams }) {
  const jobId = (await params).jobId;
  const name = (await searchParams).name;
  const page = Number((await searchParams).page) || 1;
  const limit = Number((await searchParams).limit) || 10;
  const { logs, total } = await UserJobLogs(jobId, page, limit);
  const jobDetails = await getJob(jobId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <JobName />
        <div className={styles.jobDetails}>
          <Link href={`/jobs/${jobId}/edit`} className={styles.editLink}>
            Edit Job
          </Link>

          <p>
            Status: <span>{jobDetails.status}</span>
          </p>
          <p>
            Method: <span>{jobDetails.method}</span>
          </p>
          <p>
            CronTab: <span>{jobDetails.cronExp}</span>
          </p>

          <p>
            TimeZone <span>{jobDetails.timeZone}</span>
          </p>
        </div>

        <LogsTable
          logs={logs}
          page={page}
          total={total}
          limit={limit}
          jobId={jobId}
          jobName={name}
        />
      </div>
    </div>
  );
}
