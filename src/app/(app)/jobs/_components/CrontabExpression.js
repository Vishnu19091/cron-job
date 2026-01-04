import { useCreateJob } from "@/app/_contexts/JobCreateContext";

function CrontabExpression({ onCronInputChange }) {
  const { cronExpression, humanText, dispatch } = useCreateJob();
  return (
    <div className="flex flex-col gap-5">
      <label>Crontab expression</label>
      {/* the below input must change relative to execution schedule option */}
      <input
        value={cronExpression}
        onFocus={() =>
          dispatch({ type: "SET_SCHEDULE_TYPE", payload: "CUSTOM" })
        }
        onChange={(e) => onCronInputChange(e.target.value)}
      />
      <p className="text-sm text-green-400 mt-2">⏱ {humanText}</p>
    </div>
  );
}

export default CrontabExpression;
