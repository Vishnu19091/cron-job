"use client";

function TimeZone() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="flex flex-row gap-4">
      <p>TimeZone</p>
      <p>{timeZone}</p>
    </div>
  );
}

export default TimeZone;
