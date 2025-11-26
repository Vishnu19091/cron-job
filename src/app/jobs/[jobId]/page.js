export default async function Page({ params }) {
  const id = params.jobId;
  return <div>Job ID - {id}</div>;
}
