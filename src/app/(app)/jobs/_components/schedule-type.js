export const SCHEDULE_TYPES = [
  {
    value: "EVERY_MINUTES",
    label: "Every",
    description: "Run every N minutes",
  },
  {
    value: "DAILY",
    label: "Every day at",
    description: "Run once per day",
  },
  {
    value: "MONTHLY",
    label: "Every month on",
    description: "Run once per month",
  },
  {
    value: "YEARLY",
    label: "Every year on",
    description: "Run once per year",
  },
  {
    value: "CUSTOM",
    label: "Custom",
    description: "Use custom cron expression",
  },
];
