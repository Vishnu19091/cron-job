"use client";

import { getJob, updateJob } from "@/app/_lib/server/server-data-service";
import CronScheduleMethod from "../../_components/CronScheduleMethod";
import CronScheduleType from "../../_components/CronScheduleType";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TestRunbutton from "../../_components/TestRunbutton";
import { useCreateJob } from "@/app/_contexts/JobCreateContext";
import styles from "./page.module.css";
import { toast } from "react-toastify";
import CrontabExpression from "../../_components/CrontabExpression";
import { onCronInputChange } from "../../_components/cronController";

function Page() {
  const {
    jobName,
    jobURL,
    jobMethod,
    jobBody,
    cronExpression,
    humanText,
    dispatch,
  } = useCreateJob();

  const [isLoading, setIsLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState("NULL");

  async function getJobData(jobId) {
    const { name, url, status, cronExp, method, body, timeZone } = await getJob(
      jobId
    );

    setJobStatus(status);

    dispatch({
      type: "SET_EDIT_CRON",
      payload: { name, url, method, body, cronExp },
    });

    // console.log({ name, url, status, cronExp, method, body, timeZone });
  }

  const { jobId } = useParams();
  const router = useRouter();

  useEffect(() => {
    getJobData(jobId);
  }, [jobId]);

  // TODO
  async function OnUpdate(e) {
    e.preventDefault();

    if (!jobName || !jobMethod || !jobURL) {
      toast.error("All Fields are required!");
      return;
    }

    if (!jobURL.startsWith("https://") && !jobURL.startsWith("http://")) {
      toast.error(`Invalid URL -> "${jobURL}"`);
      return;
    }

    const toastJob = toast.loading("Updating Job data...");

    try {
      setIsLoading(true);

      const shouldSendBody = jobMethod === "PUT" || jobMethod === "POST";
      const res = await updateJob(
        jobId,
        jobURL,
        jobMethod,
        shouldSendBody ? jobBody : null,
        jobStatus,
        cronExpression
      );
      // console.log(res);
      toast.update(toastJob, {
        render: `Job "${jobName}" Updated Successfully 🎉`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      if (res) router.push(`/jobs/${jobId}/logs?name=${jobName}`);
    } catch (error) {
      toast.update(toastJob, {
        render: error.message || "Failed Updating Job!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error("Unable to create new Job", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className={styles.layout_wrapper}>
        <div className={styles.gradient_border}>
          <div className={styles.layout_form_container}>
            <form onSubmit={OnUpdate} className={styles.form}>
              <div className="flex flex-row gap-2 justify-center items-center">
                <h4>
                  Edit Page for the Job -{" "}
                  <span className="font-bold">{jobName}</span>
                </h4>

                <span
                  className={` border p-2 font-bold ${
                    jobStatus === "active"
                      ? "border-green-400 bg-green-800 text-green-100"
                      : jobStatus === "paused"
                      ? "border-yellow-400 bg-yellow-800 text-yellow-100"
                      : jobStatus === "failed"
                      ? "border-red-400 bg-red-800 text-red-100"
                      : "border-gray-400 bg-gray-800 text-gray-100"
                  }`}
                >
                  {jobStatus}
                </span>
              </div>
              <div className="flex flex-col gap-5">
                <label>Job name</label>
                <input
                  placeholder="Enter Job name"
                  type="text"
                  value={jobName}
                  onChange={(e) => {
                    dispatch({ type: "SET_JOB_NAME", payload: e.target.value });
                  }}
                />

                <label>URL</label>
                <input
                  placeholder="Target URL"
                  value={jobURL}
                  onChange={(e) =>
                    dispatch({ type: "SET_JOB_URL", payload: e.target.value })
                  }
                />
              </div>

              <label>Status</label>
              <select
                name="status"
                onChange={(e) => {
                  // console.log(e.target.value);
                  setJobStatus(e.target.value);
                }}
                value={jobStatus}
              >
                <option value="active">Active</option>
                <option value="paused">Pause</option>
                <option value="failed">Failed</option>
                <option value="disabled">Disable</option>
              </select>

              <div className="flex flex-col gap-5">
                <CronScheduleMethod />

                <CronScheduleType />
              </div>

              <CrontabExpression
                value={cronExpression}
                humanText={humanText}
                onFocus={() =>
                  dispatch({ type: "SET_SCHEDULE_TYPE", payload: "CUSTOM" })
                }
                onChange={(e) => {
                  const value = e.target.value;
                  onCronInputChange({ value, dispatch });
                }}
              />

              <div className="mt-3 flex justify-between">
                <TestRunbutton />
                <br />
                <button
                  className="border-2 border-violet-900 hover:bg-violet-500"
                  type="submit"
                >
                  {isLoading ? "UPDATING..." : "UPDATE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
