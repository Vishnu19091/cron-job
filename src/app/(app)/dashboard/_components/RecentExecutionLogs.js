import { getUserJobs } from "@/app/_lib/server/server-data-service";
import styles from "./RecentExecutionLogs.module.css";
const sampleData = [
  {
    url: "https://antiphish.com",
    timestamp: "2026-01-17T04:08:07.461Z",
    href: "/link",
    status: "success",
  },
  {
    url: "https://antiphh.com",
    timestamp: "2026-01-17T04:08:55.774Z",
    href: "/link",
    status: "failed",
  },
  {
    url: "https://antiphishy.com",
    timestamp: "2026-01-17T04:08:07.361Z",
    href: "/link",
    status: "success",
  },
  {
    url: "https://antiphs.com",
    timestamp: "2026-01-17T04:08:55.874Z",
    href: "/link",
    status: "failed",
  },
];

function FormatDateTime(ts) {
  return new Date(ts).toLocaleString();
}

// function filterLastHour(data, key = "timestamp") {
//   const ONE_HOUR = 60 * 60 * 1000;

//   const now = Date.now();

//   return data.filter((item) => {
//     const time = new Date(item[key]).getTime();

//     return now - time <= ONE_HOUR;
//   });
// }

async function RecentExecutionLogs() {
  const userJobs = await getUserJobs();

  // const lastHour = filterLastHour(userJobs.rows, "timeStamp");
  // console.log(lastHour);
  return (
    <div className="border border-white rounded-2xl p-3">
      <h3 className="text-2xl">Recent Execution</h3>
      <hr />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>URL</th>
            <th>Status</th>
            <th>LastRun</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((d) => (
            <tr key={d.timestamp}>
              <td className="font-bold">{d.url}</td>
              <td
                className={`${d.status === "success" ? styles.success : styles.failed}`}
              >
                {d.status}
              </td>

              <td>{FormatDateTime(d.timestamp)}</td>

              <td>
                <a href={d.href} className={styles.link}>
                  View logs →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentExecutionLogs;
