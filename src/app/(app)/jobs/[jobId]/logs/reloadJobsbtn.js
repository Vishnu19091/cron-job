"use client";

import { UserJobLogs } from "@/app/_lib/server/server-data-service";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

function ReloadJobsbtn({ jobId, setLogs, jobName }) {
  const router = useRouter();
  async function reloadJobLogs() {
    const { logs } = await UserJobLogs(jobId);
    setLogs(logs);

    router.push(`/jobs/${jobId}/logs?page=1&name=${jobName}`);
  }

  return (
    <button
      title="Reload Job Logs"
      className="p-2 bg-blue-400 text-black rounded cursor-pointer w-fit"
      onClick={reloadJobLogs}
    >
      <RotateCcw />
    </button>
  );
}

export default ReloadJobsbtn;
