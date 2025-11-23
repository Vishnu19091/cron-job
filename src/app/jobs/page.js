"use client";

import { appwrite } from "@/app/_lib/appwrite";
import { TablesDB, Query } from "appwrite";
import style from "./_styles/jobs.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const tablesDB = new TablesDB(appwrite);
  const [jobs, setJobs] = useState([]);

  async function loadJobs() {
    const res = await tablesDB.listRows({
      databaseId: "691eef13000459991824",
      tableId: "jobs-collections",
      queries: [Query.select(["*"])],
    });

    setJobs(res.rows);
  }

  useEffect(() => {
    loadJobs();
  }, []);
  // console.log(jobs);

  return (
    <div className={style.layer}>
      <h1 className={style.heading}>Cronjobs</h1>

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
                  <Link href={`/jobs/${rows.$id}`} className={style.editLink}>
                    Edit Job
                  </Link>
                  <Link href={`/jobs/${rows.$id}`} className={style.deleteBtn}>
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
