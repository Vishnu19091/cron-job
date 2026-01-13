import { getJob, UserJobLogs } from "@/app/_lib/server/server-data-service";
import LogsTable from "./LogsTable";
import styles from "./page.module.css";
import JobName from "./jobname";
import Link from "next/link";

export default async function Logs({ params }) {
  const jobId = (await params).jobId;
  const logs = await UserJobLogs(jobId);
  const jobDetails = await getJob(jobId);
  // console.log(jobDetails);

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
        <LogsTable logs={logs} />
      </div>
    </div>
  );
}
