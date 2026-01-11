import { CronExpressionParser } from "cron-parser";
import { DateTime } from "luxon";

/**
 * Computes the next run time for a cron job
 *
 * @param {Object} params
 * @param {string} params.cronExp
 * @param {string} params.timeZone
 * @param {Date} params.fromDate
 * @returns {Date}
 */
export function computeNextRun({ cronExp, timeZone, fromDate }) {
  if (!cronExp) {
    throw new Error("cronExp is required");
  }

  const tz = timeZone || "UTC";

  // Reference date in job timezone
  const reference = DateTime.fromJSDate(fromDate, { zone: tz });

  let interval;
  try {
    interval = CronExpressionParser.parse(cronExp, {
      currentDate: reference.toJSDate(),
      tz,
      strict: false, // allows */1 * * * *
    });
  } catch (error) {
    throw new Error(`INVALID_CRON_EXPRESSION: ${error.message}\n${cronExp}`);
  }

  const next = interval.next();

  // Always store as UTC Date
  return DateTime.fromJSDate(next.toDate(), { zone: tz }).toUTC().toJSDate();
}
