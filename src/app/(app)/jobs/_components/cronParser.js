/**
 * Function to parse cron-expression **`* /1 * * *`**
 * @param {*} cron
 * @returns
 */
export function parseCronExpression(cron) {
  const parts = cron.trim().split(" ");
  if (parts.length !== 5) return null;

  const [min, hour, day, month, week] = parts;
  //   console.log(parts);

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

  // m h D M *
  if (day === "1" && month !== "*" && week === "*") {
    return {
      type: "YEARLY",
      month,
      hour,
      minute: min,
    };
  }

  return null;
}
