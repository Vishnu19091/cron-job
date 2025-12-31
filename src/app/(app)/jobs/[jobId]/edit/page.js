async function Page({ params }) {
  const jobId = await params.jobId;

  return (
    <div style={{ textAlign: "center" }}>
      <h4>Edit Page for the Job ID - {jobId}</h4>
    </div>
  );
}

export default Page;
