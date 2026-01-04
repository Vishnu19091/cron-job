import { UserJobLogs } from "@/app/_lib/server/server-data-service";
import LogsTable from "./LogsTable";
import styles from "./page.module.css";
import JobName from "./jobname";

export default async function Logs({ params }) {
  const jobId = (await params).jobId;
  const logs = await UserJobLogs(jobId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <JobName />
        <LogsTable logs={logs} />
      </div>
    </div>
  );
}
