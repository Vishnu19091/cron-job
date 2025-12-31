import { getUserJobs } from "./lib/db";

export default async function () {
  const userJobs = await getUserJobs();

  return {
    success: true,
    message: "Scheduler run completed",
    data: userJobs,
  };
}
