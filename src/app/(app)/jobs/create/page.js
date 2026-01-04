"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { createCronJob } from "@/app/_lib/server/server-data-service";
import { useRouter } from "next/navigation";
import CrontabExpression from "../_components/CrontabExpression";
import CronScheduleType from "../_components/CronScheduleType";
import TestRunbutton from "../_components/TestRunbutton";
import CronScheduleMethod from "../_components/CronScheduleMethod";
import {
  CreateJobProvider,
  useCreateJob,
} from "@/app/_contexts/JobCreateContext";
import { toast } from "react-toastify";

/**
 * Function to parse cron-expression **`* /1 * * *`**
 * @param {*} cron
 * @returns
 */
function parseCronExpression(cron) {
  const parts = cron.trim().split(" ");
  if (parts.length > 6) return null;

  const [min, hour, day, month, week] = parts;

  // */N * * * *
  if (
    min.startsWith("*/") &&
    hour === "*" &&
    day === "*" &&
    month === "*" &&
    week === "*"
  ) {
    return {
      type: "EVERY_MINUTES",
      intervalMinutes: Number(min.replace("*/", "")),
    };
  }

  // m h * * *
  if (day === "*" && month === "*" && week === "*") {
    return {
      type: "DAILY",
      hour,
      minute: min,
    };
  }

  // m h D * *
  if (month === "*" && week === "*") {
    return {
      type: "MONTHLY",
      day,
      hour,
      minute: min,
    };
  }

  // m h 1 M *
  if (day === "1" && week === "*") {
    return {
      type: "YEARLY",
      month,
      hour,
      minute: min,
    };
  }

  return null;
}

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    jobName,
    jobURL,
    jobMethod,
    scheduleType,
    intervalMinutes,
    dailyHour,
    dailyMinute,
    monthlyDay,
    yearlyMonth,
    cronExpression,
    dispatch,
  } = useCreateJob();

  /**
   * Works only for manually changed cron-tab expression
   * @param {*} value
   * @returns cron-expression
   */
  function onCronInputChange(value) {
    dispatch({
      type: "SET_CRON",
      payload: { cron: value, text: "Custom cron schedule" },
    });
    // setCronExpression(value);

    const parsed = parseCronExpression(value);
    if (!parsed) {
      dispatch({ type: "SET_SCHEDULE_TYPE", payload: "CUSTOM" });
      return;
    }

    dispatch({ type: "SET_SCHEDULE_TYPE", payload: parsed.type });

    switch (parsed.type) {
      case "EVERY_MINUTES":
        dispatch({
          type: "SET_INTERVAL_MINUTES",
          payload: parsed.intervalMinutes,
        });

        dispatch({
          type: "SET_CRON",
          payload: {
            cron: value,
            text: `Runs every ${parsed.intervalMinutes} minute(s)`,
          },
        });

        break;

      case "DAILY":
        dispatch({
          type: "SET_DAILY_TIME",
          payload: { hour: parsed.hour, minute: parsed.minute },
        });

        dispatch({
          type: "SET_CRON",
          payload: {
            cron: value,
            text: `Runs every day at ${parsed.hour}:${parsed.minute}`,
          },
        });
        break;

      case "MONTHLY":
        //       setMonthlyDay(parsed.day);
        //       setDailyHour(parsed.hour);
        //       setDailyMinute(parsed.minute);
        dispatch({
          type: "SET_MONTHLY_DAY",
          payload: {
            day: parsed.day,
            hour: parsed.hour,
            minute: parsed.minute,
          },
        });
        //       setHumanText(
        //         `Runs every month on day ${parsed.day} at ${parsed.hour}:${parsed.minute}`
        //       );
        dispatch({
          type: "SET_CRON",
          payload: {
            cron: value,
            text: `Runs every month on day ${parsed.day} at ${parsed.hour}:${parsed.minute}`,
          },
        });
        break;

      case "YEARLY":
        //       setYearlyMonth(parsed.month);
        //       setDailyHour(parsed.hour);
        //       setDailyMinute(parsed.minute);
        dispatch({
          type: "SET_YEARLY_MONTH",
          payload: {
            month: parsed.month,
            hour: parsed.hour,
            minute: parsed.minute,
          },
        });
        //       setHumanText(
        //         `Runs every year in month ${parsed.month} at ${parsed.hour}:${parsed.minute}`
        //       );
        dispatch({
          type: "SET_CRON",
          payload: {
            cron: value,
            text: `Runs every year on day 1 of month ${parsed.month} at ${parsed.hour}:${parsed.minute}`,
          },
        });
        break;

      default:
        throw new Error("Invalid Cron-tab Expression");
    }
  }

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
        cron = `${dailyMinute} ${dailyHour} ${yearlyMonth} *`;
        text = `Runs every year on day 1 of month ${yearlyMonth} at ${dailyHour}:${dailyMinute}`;
        break;

      case "CUSTOM":
        return;

      default:
        throw new Error("Invalid cron-tab expression");
    }

    //   setCronExpression(cron);
    //   setHumanText(text);
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

    if (!jobName || !jobMethod || !jobURL) {
      toast.error("All Fields are required!");
    }

    if (!jobURL.startsWith("https://") && !jobURL.startsWith("http://")) {
      toast.error(`Invalid URL -> "${jobURL}"`);
      return;
    }

    const toastJob = toast.loading("Creating Job...");
    try {
      setIsLoading(true);

      const nextRun = new Date();
      nextRun.setMinutes(nextRun.getMinutes() + 1);
      console.log(nextRun);
      const res = await createCronJob(
        jobName,
        jobURL,
        jobMethod,
        cronExpression,
        nextRun
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

            <CrontabExpression onCronInputChange={onCronInputChange} />

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
