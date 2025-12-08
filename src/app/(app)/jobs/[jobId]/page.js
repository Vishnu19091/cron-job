import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const jobId = params.jobId;

  redirect(`/jobs/${jobId}/logs`);
}
