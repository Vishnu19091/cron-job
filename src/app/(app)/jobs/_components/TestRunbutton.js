import { useCreateJob } from "@/app/_contexts/JobCreateContext";
import { useState } from "react";
import ModalWindow from "./ModalWindow";
import Spinner from "@/app/_components/Spinner";
import { toast } from "react-toastify";

function TestRunbutton() {
  const { jobURL, jobName, jobMethod, jobBody } = useCreateJob();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [testData, setTestData] = useState({});

  async function Testrun() {
    if (!jobName || !jobMethod || !jobURL) {
      toast.error("All Fields are required!");
    }

    if (!jobURL.startsWith("https://") && !jobURL.startsWith("http://")) {
      toast.error(`Invalid URL -> "${jobURL}"`);
      return;
    }

    try {
      setIsModalOpen(true);
      setIsLoading(true);
      const res = await fetch("/api/testURL", {
        method: "POST",
        body: JSON.stringify({
          url: jobURL,
          method: jobMethod,
          body: jobBody
        }),
      });

      const data = await res.json();
      setIsLoading(false);
      // console.log("Test button clicked with Valid URL");
      // console.log("Data ->", data);
      setTestData(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button
        className="border-2 border-amber-900 hover:bg-amber-500"
        type="button"
        onClick={Testrun}
      >
        TEST RUN
      </button>

      <ModalWindow
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        className={`${testData.ok ? "text-green-500" : "text-red-500"}`}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h3 className="text-xl text-start">Name: {jobName}</h3>
            <p className="text-start">OK: {testData.ok ? "True" : "False"}</p>
            <p className="text-start">Status: {testData.statusText}</p>
            <p className="text-start">Duration in ms: {testData.durationMs}</p>

            {testData.data && (
              <>
                <h4 className="mt-3 text-xl text-white">Response Body</h4>
                <pre className="bg-[#171717] text-white p-2 rounded-lg text-sm text-start">
                  {JSON.stringify(testData.data, null, 2)}
                </pre>
              </>
            )}
          </>
        )}
      </ModalWindow>
    </>
  );
}

export default TestRunbutton;
