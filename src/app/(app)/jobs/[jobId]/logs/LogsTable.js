"use client";

import { useState } from "react";
import styles from "./LogsTable.module.css";
import CopyButton from "@/app/_components/CopyButton";

export default function LogsTable({ logs }) {
  const [sortBy, setSortBy] = useState("timestamp");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  // Sorting
  const sortedLogs = [...logs].sort((a, b) => {
    if (sortBy === "timestamp")
      return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === "responseTime") return b.responseTime - a.responseTime;
    if (sortBy === "statusCode") return b.statusCode - a.statusCode;
    return 0;
  });

  // Filtering
  const filteredLogs = sortedLogs.filter((log) => {
    if (filter === "success") return log.result === true;
    if (filter === "failed") return log.result === false;
    return true;
  });

  return (
    <div className={styles.wrapper}>
      {/* Top Controls */}
      <div className={styles.controls}>
        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="timestamp">Sort by Timestamp</option>
          <option value="responseTime">Sort by Response Time</option>
          <option value="statusCode">Sort by Status Code</option>
        </select>

        <select
          className={styles.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Logs</option>
          <option value="success">Success Only</option>
          <option value="failed">Failed Only</option>
        </select>
      </div>

      {/* Main Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
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
              {filteredLogs.map((log) => (
                <>
                  <tr
                    key={log.$id}
                    className={styles.row}
                    onClick={() =>
                      setExpanded(expanded === log.$id ? null : log.$id)
                    }
                  >
                    <td className={styles.td}>
                      {new Date(log.timestamp).toLocaleString()}
                    </td>

                    <td className={styles.td}>{log.statusCode}</td>

                    <td className={styles.td}>{log.responseTime} ms</td>

                    <td
                      className={`${styles.td} ${
                        log.result ? styles.success : styles.failed
                      }`}
                    >
                      {log.result ? "Success" : "Failed"}
                    </td>

                    <td className={`${styles.td} ${styles.viewBtn}`}>
                      {expanded === log.$id ? "Hide" : "View"}
                    </td>
                  </tr>

                  {/* Expandable Section */}
                  {expanded === log.$id && (
                    <tr className={styles.expandedRow}>
                      <td colSpan="5" className={styles.expandedCol}>
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
                <td colSpan={5} className={styles.noLogsCell}>
                  No jobs executed
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
