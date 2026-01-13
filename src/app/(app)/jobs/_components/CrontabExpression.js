import { useCreateJob } from "@/app/_contexts/JobCreateContext";

function CrontabExpression({ value, humanText, onChange, onFocus }) {
  return (
    <div className="flex flex-col gap-5">
      <label>Crontab expression</label>
      {/* the below input must change relative to execution schedule option */}
      <input value={value} onFocus={onFocus} onChange={onChange} />
      <p className="text-sm text-green-400 mt-2">⏱ {humanText}</p>
    </div>
  );
}

export default CrontabExpression;
