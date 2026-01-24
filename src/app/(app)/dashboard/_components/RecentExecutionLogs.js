import styles from "./RecentExecutionLogs.module.css";
import { createSessionClient } from "@/app/_lib/server/appwrite.server";
import { Query } from "node-appwrite";
import RecentExecutionTable from "./WrapperRecentExecution";

async function RecentExecutionLogs() {
  const dbID = String(process.env.NEXT_PUBLIC_DATABASE_ID);

  const jobsCollections = "jobs-collections";

  const { account, tablesDB } = await createSessionClient();
  const now = new Date();

  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  let recentLogsData;

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

  return (
    <div className="border border-(--border) rounded-2xl p-3 w-[85%]">
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
            <RecentExecutionTable logData={recentLogsData} />
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-2xl">
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
