"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createCronJob } from "@/app/_lib/server/server-data-service";
import ParseJSON from "@/app/_lib/server/parseJSON";
import styles from "./page.module.css";
import { useCreateJob } from "@/app/_contexts/JobCreateContext";
import CrontabExpression from "../_components/CrontabExpression";
import CronScheduleType from "../_components/CronScheduleType";
import TestRunbutton from "../_components/TestRunbutton";
import CronScheduleMethod from "../_components/CronScheduleMethod";
import { onCronInputChange } from "../_components/cronController";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    jobName,
    jobURL,
    jobMethod,
    jobBody,
    scheduleType,
    intervalMinutes,
    dailyHour,
    dailyMinute,
    monthlyDay,
    yearlyMonth,
    cronExpression,
    humanText,
    dispatch,
  } = useCreateJob();

  /**
   * Works for select options
   * @returns cron-expression for selected options
   */
  function generateCron() {
    let cron = "";
    let text = "";

    switch (scheduleType) {
      case "EVERY_MINUTES":
        cron = `*/${intervalMinutes} * * * *`;
        text = `Runs every ${intervalMinutes} minute(s)`;
        break;

      case "DAILY":
        cron = `${dailyMinute} ${dailyHour} * * *`;
        text = `Runs every day at ${dailyHour}:${dailyMinute}`;
        break;

      case "MONTHLY":
        cron = `${dailyMinute} ${dailyHour} ${monthlyDay} * *`;
        text = `Runs every month on day ${monthlyDay} at ${dailyHour}:${dailyMinute}`;
        break;

      case "YEARLY":
        cron = `${dailyMinute} ${dailyHour} ${monthlyDay} ${yearlyMonth} *`;
        // console.log(cron);
        text = `Runs every year on day ${monthlyDay} of month ${yearlyMonth} at ${dailyHour}:${dailyMinute}`;
        break;

      case "CUSTOM":
        return;

      default:
        throw new Error("Invalid cron-tab expression");
    }

    dispatch({
      type: "SET_CRON",
      payload: { cron: cron, text: text },
    });
  }

  useEffect(() => {
    if (scheduleType !== "CUSTOM") {
      generateCron();
    }
  }, [
    scheduleType,
    intervalMinutes,
    dailyHour,
    dailyMinute,
    monthlyDay,
    yearlyMonth,
  ]);

  async function onCreateJob(e) {
    e.preventDefault();

    if (!jobName && !jobURL) {
      toast.error("All Fields are required!");
      return;
    } else if (
      (jobMethod === "POST" || jobMethod === "PUT") &&
      jobBody === null
    ) {
      toast.error("Job Body is required!");
      return;
    }

    if (!jobURL.startsWith("https://") && !jobURL.startsWith("http://")) {
      toast.error(`Invalid URL -> "${jobURL}"`);
      return;
    }

    if (!jobURL.startsWith("https://") && !jobURL.startsWith("http://")) {
      toast.error(`Invalid URL -> "${jobURL}"`);
      return;
    }

    const toastJob = toast.loading("Creating Job...");
    try {
      setIsLoading(true);

      const shouldSendBody = jobMethod === "POST" || jobMethod === "PUT";
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const res = await createCronJob(
        jobName,
        jobURL,
        jobMethod,
        shouldSendBody ? ParseJSON(jobBody) : null,
        cronExpression,
        timeZone,
      );
      const id = res.$id;
      // console.log(id);
      toast.update(toastJob, {
        render: `Job "${jobName}" Created Successfully 🎉`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      if (res) router.push(`/jobs/${id}/logs?name=${jobName}`);
    } catch (error) {
      toast.update(toastJob, {
        render: error.message || "Failed Creating Job!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error("Unable to create new Job", error);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.layout_wrapper}>
      <div className={styles.gradient_border}>
        <div className={styles.layout_form_container}>
          <form onSubmit={onCreateJob} className={styles.form}>
            <div className="flex flex-col gap-5">
              <label>Job name</label>
              <input
                placeholder="Enter Job name"
                type="text"
                onChange={(e) => {
                  dispatch({ type: "SET_JOB_NAME", payload: e.target.value });
                }}
              />

              <label>URL</label>
              <input
                placeholder="Target URL"
                onChange={(e) =>
                  dispatch({ type: "SET_JOB_URL", payload: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-5">
              <CronScheduleMethod />

              <CronScheduleType />
            </div>

            <CrontabExpression
              value={cronExpression}
              humanText={humanText}
              onFocus={() =>
                dispatch({
                  type: "SET_SCHEDULE_TYPE",
                  payload: "CUSTOM",
                })
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
                {isLoading ? "CREATING..." : "CREATE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
