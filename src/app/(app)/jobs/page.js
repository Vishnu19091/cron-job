import Spinner from "@/app/_components/Spinner";
import JobList from "./_components/jobList";
import styles from "./_styles/jobs.module.css";
import "./_styles/jobs.css";
import CreateNewCronJobBTN from "@/app/_components/CreateJobBTN";
import { Suspense } from "react";

export const metadata = {
  title: "Jobs",
};

export default function Page() {
  return (
    <div className={styles.layer}>
      <div className={styles.header}>
        <h1>Cronjobs</h1>
        <CreateNewCronJobBTN />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>S.No</th>
              <th>Job Title, URL</th>
              <th>Last Run</th>
              <th>Next Run</th>
              <th>CronTab Expression</th>
              <th>Status</th>
              <th>Method</th>
              <th>Preference</th>
            </tr>
          </thead>

          <Suspense
            fallback={
              <tbody>
                <tr>
                  <td colSpan={8}>
                    <Spinner message="Loading Jobs..." />
                  </td>
                </tr>
              </tbody>
            }
          >
            <JobList />
          </Suspense>
        </table>
      </div>
    </div>
  );
}
