"use client";
import styles from "./page.module.css";

export default function Page() {
  function onCreateJob(e) {
    e.preventDefault();

    console.log("Create job function executed!");
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
              <input placeholder="Enter Job name" type="text" />

              <label>URL</label>
              <input placeholder="Target URL" />
            </div>

            <div className="flex flex-col gap-5">
              <label>Method</label>
              <select name="method">
                <option value="get">GET</option>
                <option value="post">POST</option>
                <option value="put">PUT</option>
                <option value="delete">DELETE</option>
              </select>

              <label>Execution Schedule</label>
              <span>
                Every{" "}
                <select name="Job schedule">
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
