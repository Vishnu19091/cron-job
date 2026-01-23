"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../_styles/jobs.module.css";
import "../_styles/jobs.css";

import { deleteCronJob } from "@/app/_lib/server/server-data-service";
import ModalWindow from "./ModalWindow";

function JobListClient({ jobs: initialJobs }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

  async function onDelete() {
    try {
      const res = await deleteCronJob(selectedJob.$id);

      if (res)
        setJobs((prev) => prev.filter((job) => job.$id !== selectedJob.$id));
      toast.success(`Job "${selectedJob.name}" deleted successfully!`);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  }

  return (
    <>
      <tbody>
        {jobs.length ? (
          <>
            {jobs.map((rows, idx) => (
              <tr key={rows.$id}>
                <td>{idx + 1}.</td>
                <td className={styles.titleCell}>
                  <span className={styles.jobName}>{rows.name}</span>
                  <span className={styles.jobUrl}>{rows.url}</span>
                </td>

                <td>
                  {rows.lastRun
                    ? new Date(rows.lastRun).toLocaleString()
                    : "No Executions made!"}
                </td>
                <td>{new Date(rows.nextRun).toLocaleString()}</td>
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
                      onClick={() => {
                        setSelectedJob(rows);
                        setIsModalOpen(true);
                      }}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <tr>
            <td colSpan={8} className={styles.not_found}>
              No Jobs found!
            </td>
          </tr>
        )}
      </tbody>
      <ModalWindow isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <p>
          Are you sure you want to Delete the Job
          <span className="font-bold">`{selectedJob?.name}`</span>. This will
          delete all logs of this job.
        </p>

        <div className="flex flex-row gap-4 my-1">
          <button
            className="bg-gray-500 p-1.5 rounded cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            No
          </button>
          <button
            className="bg-red-500 p-1.5 rounded cursor-pointer"
            onClick={onDelete}
          >
            Yes, Delete
          </button>
        </div>
      </ModalWindow>
    </>
  );
}

export default JobListClient;
