"use client";
import styles from "./RecentExecutionLogs.module.css";

function FormatDateTime(ts) {
  return new Date(ts).toLocaleString();
}

function RecentExecutionTable({logData}) {
  return (
    <>
      {logData.map((d, idx) => (
        <tr key={d.$id}>
          <td>{idx + 1}</td>
          <td className="font-bold" title={`Job Name - ${d.name}`}>
            {d.url}
          </td>

          <td>{d.cronExp}</td>

          <td>{d.method}</td>

          <td
            className={`${d.status === "active" ? styles.success : styles.failed}`}
          >
            {d.status}
          </td>

          <td>{FormatDateTime(d.lastRun)}</td>

          <td>
            <a
              href={`/jobs/${d.$id}/logs?name=${d.name}`}
              className={styles.link}
            >
              View logs →
            </a>
          </td>
        </tr>
      ))}
    </>
  );
}

export default RecentExecutionTable;
