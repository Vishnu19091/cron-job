"use client";

import { useEffect, useState } from "react";
import styles from "./LogsTable.module.css";
import CopyButton from "@/app/_components/CopyButton";
import LogControls from "./logControls";

export default function LogsTable({
  logs: data,
  page,
  total,
  limit,
  jobId,
  jobName,
}) {
  const [sortBy, setSortBy] = useState("timestamp");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(data);
    // console.log(data);
  }, [logs, setLogs]);

  const totalPages = Math.ceil(total / limit);
  // console.log(logs);

  // Sorting
  const sortedLogs = [...logs].sort((a, b) => {
    if (sortBy === "timestamp")
      return new Date(b.$createdAt) - new Date(a.$createdAt);
    if (sortBy === "responseTime") return b.responseTime - a.responseTime;
    if (sortBy === "statusCode") return b.statusCode - a.statusCode;
    return 0;
  });

  // Filtering
  const filteredLogs = sortedLogs.filter((log) => {
    if (filter === "success") return log.success === true;
    if (filter === "failed") return log.success === false;
    return true;
  });

  return (
    <div className={styles.wrapper}>
      <LogControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        filter={filter}
        setFilter={setFilter}
        jobId={jobId}
        setLogs={setLogs}
        jobName={jobName}
        limit={limit}
      />

      {/* Main Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>S.No</th>
              <th className={styles.th}>Timestamp</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Time</th>
              <th className={styles.th}>Result</th>
              <th className={styles.th}>Details</th>
            </tr>
          </thead>

          {/* Table Body */}
          {logs.length > 0 && (
            <tbody className={styles.tbody}>
              {filteredLogs.map((log, idx) => (
                <>
                  <tr
                    key={log.$id}
                    className={styles.row}
                    onClick={() =>
                      setExpanded(expanded === log.$id ? null : log.$id)
                    }
                  >
                    <td className={styles.td}>{idx + 1}</td>
                    <td className={styles.td}>
                      {new Date(log.$createdAt).toLocaleString()}
                    </td>

                    <td className={styles.td}>{log.statusCode}</td>

                    <td className={styles.td}>{log.responseTime} ms</td>

                    <td
                      className={`${styles.td} ${
                        log.success ? styles.success : styles.failed
                      }`}
                    >
                      {log.success ? "Success" : "Failed"}
                    </td>

                    <td className={`${styles.td} ${styles.viewBtn}`}>
                      {expanded === log.$id ? "Hide" : "View"}
                    </td>
                  </tr>

                  {/* Expandable Section */}
                  {expanded === log.$id && (
                    <tr className={styles.expandedRow}>
                      <td colSpan="6" className={styles.expandedCol}>
                        <div className={styles.responseBox}>
                          <strong>Response Body:</strong>
                          <pre className={styles.pre}>
                            {log.responseBody || "No body"}
                          </pre>
                        </div>

                        <CopyButton textToCopy={log.responseBody} />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          )}

          {/* No Logs */}
          {logs.length === 0 && (
            <tbody className={styles.noLogsBody}>
              <tr>
                <td colSpan={6} className={styles.noLogsCell}>
                  No jobs executed
                </td>
              </tr>
            </tbody>
          )}

          {/* No Failed Logs */}
          {filteredLogs.length === 0 && filter === "failed" && (
            <tbody className={styles.noLogsBody}>
              <tr>
                <td colSpan={6} className={styles.noLogsCell}>
                  No Failed logs
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <a
            className={styles.pagination_nav_link}
            href={`/jobs/${jobId}/logs?page=${
              page - 1
            }&limit=${limit}&name=${jobName}`}
            aria-disabled={page === 1}
          >
            Prev
          </a>

          <span>
            Page {page} of {totalPages}
          </span>

          <a
            className={styles.pagination_nav_link}
            href={`/jobs/${jobId}/logs?page=${
              page + 1
            }&limit=${limit}&name=${jobName}`}
            aria-disabled={page === totalPages}
          >
            Next
          </a>
        </div>
      )}
    </div>
  );
}
