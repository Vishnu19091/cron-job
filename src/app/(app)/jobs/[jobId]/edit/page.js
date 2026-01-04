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

function Page() {
  const { jobName, jobURL, jobMethod, JobBody, cronExpression, dispatch } =
    useCreateJob();

  const [isLoading, setIsLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState("");

  async function getJobData(jobId) {
    const { name, url, status, cronExp, method, body, timeZone } = await getJob(
      jobId
    );

    dispatch({
      type: "SET_EDIT_CRON",
      payload: { name, url, method, body, cronExpression: cronExp },
    });

    console.log({ name, url, status, cronExp, method, body, timeZone });
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
    }

    if (!jobURL.startsWith("https://") && !jobURL.startsWith("http://")) {
      toast.error(`Invalid URL -> "${jobURL}"`);
      return;
    }

    const toastJob = toast.loading("Updating Job data...");

    try {
      setIsLoading(true);

      const res = await updateJob(
        jobId,
        jobURL,
        jobMethod,
        JobBody,
        jobStatus,
        cronExpression
      );
      const id = res.$id;
      // console.log(id);
      toast.update(toastJob, {
        render: `Job "${jobName}" Updated Successfully 🎉`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      if (res) router.push(`/jobs/${id}/logs?name=${jobName}`);
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
              <h4>
                Edit Page for the Job -{" "}
                <span className="font-bold">{jobName}</span>
              </h4>
              <div className="flex flex-col gap-5">
                <label>Job name</label>
                <input
                  placeholder="Enter Job name"
                  type="text"
                  defaultValue={jobName}
                  onChange={(e) => {
                    dispatch({ type: "SET_JOB_NAME", payload: e.target.value });
                  }}
                />

                <label>URL</label>
                <input
                  placeholder="Target URL"
                  defaultValue={jobURL}
                  onChange={(e) =>
                    dispatch({ type: "SET_JOB_URL", payload: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-5">
                <CronScheduleMethod />

                <CronScheduleType />
              </div>

              {/* <CrontabExpression onCronInputChange={onCronInputChange} /> */}

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
