"use client";

import {
  getUserJobs,
  deleteCronJob,
} from "@/app/_lib/server/server-data-service";
import styles from "./_styles/jobs.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateNewCronJobBTN from "@/app/_components/CreateJobBTN";

export default function Page() {
  const [jobs, setJobs] = useState([]);

  async function loadJobs() {
    const res = await getUserJobs();
    console.log(res);

    setJobs(res.rows);
  }

  useEffect(() => {
    loadJobs();
  }, []);

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
    <div className={styles.layer}>
      <div className={styles.header}>
        <h1>Cronjobs</h1>
        <CreateNewCronJobBTN />
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Job Title, URL</th>
            <th>Last Run</th>
            <th>Schedule Frequency</th>
            <th>Status</th>
            <th>Method</th>
            <th>Preference</th>
          </tr>
        </thead>

        {jobs.length > 0 ? (
          <tbody>
            {jobs.map((rows) => (
              <tr key={rows.$id}>
                <td className={styles.titleCell}>
                  <span className={styles.jobName}>{rows.name}</span>
                  <span className={styles.jobUrl}>{rows.url}</span>
                </td>

                <td>{new Date(rows.lastRun).toLocaleString()}</td>
                <td title="change the expression in to words">
                  {rows.cronExp}
                </td>

                <td>
                  <span
                    className={`${styles.status} ${
                      rows.status === "active"
                        ? styles.active
                        : rows.status === "paused"
                        ? styles.paused
                        : styles.failed
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
                    <Link
                      href={`/jobs/${rows.$id}/edit`}
                      className={styles.editLink}
                    >
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
        ) : (
          <tbody>
            <tr>
              <td colSpan={6} className={styles.not_found}>
                No Jobs Found
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
