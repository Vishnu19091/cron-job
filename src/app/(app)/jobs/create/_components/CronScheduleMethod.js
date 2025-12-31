import { useCreateJob } from "@/app/_contexts/JobCreateContext";

function CronScheduleMethod() {
  const { jobMethod, jobBody, dispatch } = useCreateJob();
  return (
    <>
      <label>Method</label>
      <select
        name="method"
        onChange={(e) =>
          dispatch({ type: "SET_JOB_METHOD", payload: e.target.value })
        }
      >
        <option value="GET">GET</option>
        <option value="PUT">PUT</option>
        <option value="POST">POST</option>
        <option value="DELETE">DELETE</option>
      </select>

      {/* If method is POST/PUT conditionally render body component */}
      {jobMethod === "POST" || jobMethod === "PUT" ? (
        <textarea
          className="w-full resize-none"
          id="body"
          name="body"
          placeholder={"Request body goes here"}
          value={jobBody}
          onChange={(e) =>
            dispatch({ type: "SET_JOB_BODY", payload: e.target.value })
          }
        ></textarea>
      ) : null}
    </>
  );
}

export default CronScheduleMethod;
