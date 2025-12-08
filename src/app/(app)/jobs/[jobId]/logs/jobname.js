"use client";

import { useSearchParams } from "next/navigation";

export default function JobName() {
  const searchParam = useSearchParams();
  const jobName = searchParam.get("name");

  return (
    <h1 className="text-2xl font-bold mb-6 text-center">
      Logs for Job : {jobName}
    </h1>
  );
}
