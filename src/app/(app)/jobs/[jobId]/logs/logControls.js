import styles from "./LogsTable.module.css";
import ReloadJobsbtn from "./reloadJobsbtn";

function LogControls({
  sortBy,
  setSortBy,
  filter,
  setFilter,
  jobId,
  jobName,
  setLogs,
  limit,
}) {
  const limits = [10, 20, 30, 40, 50];

  return (
    <div className={styles.controls}>
      {/* Top Controls */}
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

      <ReloadJobsbtn jobId={jobId} setLogs={setLogs} jobName={jobName} />

      <select
        className={styles.select}
        value={limit}
        onChange={(e) => {
          const newLimit = e.target.value;
          window.location.href = `/jobs/${jobId}/logs?page=1&limit=${newLimit}&name=${jobName}`;
        }}
      >
        {limits.map((l) => (
          <option key={l} value={l}>
            {l} Rows per page
          </option>
        ))}
      </select>
    </div>
  );
}

export default LogControls;
