"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { createCronJob } from "@/app/_lib/data-service";
import { useRouter } from "next/navigation";

export default function Page() {
  const [name, setName] = useState("");
  const [url, setURL] = useState("");
  const [method, setMethod] = useState("GET");
  const [schedule, setSchedule] = useState("1");

  const router = useRouter();

  async function onCreateJob(e) {
    e.preventDefault();

    if (name && url && method && schedule) {
      const res = await createCronJob(name, url, method, schedule);
      const id = res.$id;
      console.log(id);

      if (res) router.push(`/jobs/${id}/logs?name=${name}`);
    }
  }

  async function Testrun() {
    console.log("Test Run button clicked!");
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
                onChange={(e) => setName(e.target.value)}
              />

              <label>URL</label>
              <input
                placeholder="Target URL"
                onChange={(e) => setURL(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-5">
              <label>Method</label>
              <select name="method" onChange={(e) => setMethod(e.target.value)}>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
                <option value="POST">POST</option>
                <option value="DELETE">DELETE</option>
              </select>

              <label>Execution Schedule</label>
              <span>
                Every{" "}
                <select
                  name="Job schedule"
                  onChange={(e) => setSchedule(e.target.value)}
                >
                  <option value="1">1 minutes</option>
                  <option value="2">2 minutes</option>
                  <option value="5">5 minutes</option>
                </select>
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <label>Crontab expression</label>
              <input defaultValue="* /1 * * * *" />
            </div>

            <div className="mt-3 flex justify-between">
              <button
                className="border-2 border-amber-900 hover:bg-amber-500"
                type="button"
                onClick={Testrun}
              >
                TEST RUN
              </button>
              <br />
              <button
                className="border-2 border-violet-900 hover:bg-violet-500"
                type="submit"
              >
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
