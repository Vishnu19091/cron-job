import { parseCronExpression } from "./cronParser";

/**
 * Works only for manually changed cron-tab expression
 * @param {*} value
 * @returns cron-expression
 */
export function onCronInputChange({ value, dispatch }) {
  dispatch({
    type: "SET_CRON",
    payload: { cron: value, text: "Custom cron schedule" },
  });

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
      dispatch({
        type: "SET_MONTHLY_DAY",
        payload: {
          day: parsed.day,
          hour: parsed.hour,
          minute: parsed.minute,
        },
      });

      dispatch({
        type: "SET_CRON",
        payload: {
          cron: value,
          text: `Runs every month on day ${parsed.day} at ${parsed.hour}:${parsed.minute}`,
        },
      });
      break;

    case "YEARLY":
      dispatch({
        type: "SET_YEARLY_MONTH",
        payload: {
          month: parsed.month,
          hour: parsed.hour,
          minute: parsed.minute,
        },
      });

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
