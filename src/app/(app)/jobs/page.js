"use client";

import style from "./_styles/jobs.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteCronJob, getUserJobs } from "@/app/_lib/data-service";

export default function Page() {
  const [jobs, setJobs] = useState([]);

  async function loadJobs() {
    const res = await getUserJobs();

    setJobs(res.rows);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className={style.layer}>
      <div className={style.header}>
        <h1>Cronjobs</h1>
        <Link href="/jobs/create">Create job</Link>
      </div>

      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th>Job Title, URL</th>
            <th>Last Run</th>
            <th>Scheduled</th>
            <th>Status</th>
            <th>Method</th>
            <th>Preference</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((rows) => (
            <tr key={rows.$id}>
              <td className={style.titleCell}>
                <span className={style.jobName}>{rows.name}</span>
                <span className={style.jobUrl}>{rows.url}</span>
              </td>

              <td>{rows.lastRun}</td>
              <td>{rows.schedule}</td>

              <td>
                <span
                  className={`${style.status} ${
                    rows.status === "active"
                      ? style.active
                      : rows.status === "paused"
                      ? style.paused
                      : style.failed
                  }`}
                >
                  {rows.status}
                </span>
              </td>

              <td>
                <span className={style.method}>{rows.method}</span>
              </td>

              <td>
                <div className={style.actions}>
                  <Link
                    href={`/jobs/${rows.$id}/logs?name=${rows.name}`}
                    className={style.editLink}
                  >
                    View Logs
                  </Link>
                  <button className={style.deleteBtn}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
