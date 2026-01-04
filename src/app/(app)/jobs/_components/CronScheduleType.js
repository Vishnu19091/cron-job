import { useCreateJob } from "@/app/_contexts/JobCreateContext";
import { SCHEDULE_TYPES } from "./schedule-type";

function CronScheduleType() {
  const {
    dispatch,
    scheduleType,
    intervalMinutes,
    dailyHour,
    dailyMinute,
    monthlyDay,
    yearlyMonth,
  } = useCreateJob();

  return (
    <>
      <label>Execution Schedule</label>
      <div>
        <select
          name="Job schedule"
          onChange={(e) => {
            dispatch({ type: "SET_SCHEDULE_TYPE", payload: e.target.value });
          }}
        >
          {SCHEDULE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {scheduleType === "EVERY_MINUTES" && (
          <select
            value={intervalMinutes}
            onChange={(e) => {
              dispatch({
                type: "SET_INTERVAL_MINUTES",
                payload: e.target.value,
              });
              // setIntervalMinutes(e.target.value);
            }}
          >
            <option value="1">1 minute</option>
            <option value="2">2 minutes</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
            <option value="25">25 minutes</option>
            <option value="30">30 minutes</option>
          </select>
        )}

        {scheduleType !== "EVERY_MINUTES" && scheduleType !== "CUSTOM" && (
          <div className="flex items-center gap-2">
            <label>Hour</label>
            <input
              type="number"
              min="0"
              max="23"
              value={dailyHour}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 && value <= 23) {
                  dispatch({
                    type: "SET_DAILY_TIME",
                    payload: {
                      hour: value,
                      minute: dailyMinute,
                    },
                  });
                }
              }}
            />

            <label>Minute</label>
            <input
              type="number"
              min="0"
              max="59"
              value={dailyMinute}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 && value <= 59) {
                  dispatch({
                    type: "SET_DAILY_TIME",
                    payload: {
                      hour: dailyHour,
                      minute: value,
                    },
                  });
                }
              }}
            />
          </div>
        )}

        {scheduleType === "MONTHLY" && (
          <>
            <label>Month Day</label>
            <input
              type="number"
              min="1"
              max="31"
              value={monthlyDay}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 1 && value <= 31)
                  dispatch({
                    type: "SET_MONTHLY_DAY",
                    payload: {
                      day: value,
                      hour: dailyHour,
                      minute: dailyMinute,
                    },
                  });
              }}
            />
          </>
        )}

        {scheduleType === "YEARLY" && (
          <>
            <label>Month</label>
            <input
              type="number"
              min="1"
              max="12"
              value={yearlyMonth}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 1 && value <= 12)
                  dispatch({
                    type: "SET_YEARLY_MONTH",
                    payload: {
                      month: value,
                      hour: dailyHour,
                      minute: dailyMinute,
                    },
                  });
              }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default CronScheduleType;
