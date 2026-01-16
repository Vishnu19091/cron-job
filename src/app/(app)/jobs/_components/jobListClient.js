"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../_styles/jobs.module.css";

import { deleteCronJob } from "@/app/_lib/server/server-data-service";

function JobListClient({ jobs: initialJobs }) {
  const [jobs, setJobs] = useState(initialJobs);

  async function onDelete(rowid, name) {
    try {
      const res = await deleteCronJob(rowid);

      if (res) setJobs((prev) => prev.filter((job) => job.$id !== rowid));
      toast.success(`Job "${name}" deleted successfully!`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <tbody>
      {jobs.map((rows) => (
        <tr key={rows.$id}>
          <td className={styles.titleCell}>
            <span className={styles.jobName}>{rows.name}</span>
            <span className={styles.jobUrl}>{rows.url}</span>
          </td>

          <td>{new Date(rows.lastRun).toLocaleString()}</td>
          <td>{new Date(rows.nextRun).toLocaleString()}</td>
          <td title="change the expression in to words">{rows.cronExp}</td>

          <td>
            <span
              className={`${styles.status} ${
                rows.status === "active"
                  ? styles.active
                  : rows.status === "paused"
                  ? styles.paused
                  : rows.status === "failed"
                  ? styles.failed
                  : styles.disabled
              }`}
            >
              {rows.status}
            </span>
          </td>

          <td>
            <span className={styles.method}>{rows.method}</span>
          </td>

          <td>
            <div className={styles.actions}>
              <Link href={`/jobs/${rows.$id}/edit`} className={styles.editLink}>
                Edit Job
              </Link>
              <Link
                href={`/jobs/${rows.$id}/logs?name=${rows.name}`}
                className={styles.editLink}
              >
                View Logs
              </Link>
              <button
                onClick={() => onDelete(rows.$id, rows.name)}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default JobListClient;
