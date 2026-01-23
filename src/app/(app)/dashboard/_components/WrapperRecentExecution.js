"use client";

import RecentExecutionLogs from "./RecentExecutionLogs";

function WrapperRecentExecution() {
  const now = new Date();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  console.log(timeZone);

  return (
    <div>
      <p>{now.toTimeString()}</p>
      {/* <RecentExecutionLogs userTimeZone={timeZone} />; */}
    </div>
  );
}

export default WrapperRecentExecution;
