import { getUserJobs } from "@/app/_lib/server/server-data-service";
import React from "react";
import JobListClient from "./jobListClient";

async function JobList() {
  const res = await getUserJobs();

  return <JobListClient jobs={res.rows} />;
}

export default JobList;
