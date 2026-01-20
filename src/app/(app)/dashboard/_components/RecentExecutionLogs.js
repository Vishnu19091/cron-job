import styles from "./RecentExecutionLogs.module.css";
import { createSessionClient } from "@/app/_lib/server/appwrite.server";
import { Query } from "node-appwrite";

function FormatDateTime(ts) {
  return new Date(ts).toLocaleString();
}

async function RecentExecutionLogs() {
  const dbID = String(process.env.NEXT_PUBLIC_DATABASE_ID);

  const jobsCollections = "jobs-collections";

  const { account, tablesDB } = await createSessionClient();
  const now = new Date();

  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  let recentLogsData;

  // console.log(
  //   "Now->",
  //   now.toISOString(),
  //   "\nOne Hour Ago ->",
  //   oneHourAgo.toISOString(),
  // );

  console.log({
    now: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  try {
    const ownerId = (await account.get()).$id;
    const result = await tablesDB.listRows({
      databaseId: dbID,
      tableId: jobsCollections,
      queries: [
        Query.equal("ownerId", ownerId),
        Query.between("lastRun", oneHourAgo.toISOString(), now.toISOString()),
      ],
    });

    recentLogsData = result.rows;
  } catch (error) {
    throw new Error(error);
  }
  // const userJobs = await getUserJobs();

  // const lastHour = filterLastHour(userJobs.rows, "timeStamp");
  // console.log(recentLogsData);
  return (
    <div className="border border-white rounded-2xl p-3">
      <h3 className="text-2xl">
        Recent Execution <span>Last 1 hour</span>
      </h3>
      <hr />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>URL</th>
            <th>Cron-Tab</th>
            <th>Method</th>
            <th>Status</th>
            <th>LastRun</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {recentLogsData.length ? (
            recentLogsData.map((d, idx) => (
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
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-2xl">
                No Recent Executions
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentExecutionLogs;
