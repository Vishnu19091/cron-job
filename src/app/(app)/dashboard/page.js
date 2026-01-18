import CreateJobBTN from "@/app/_components/CreateJobBTN";
import UserInfo from "@/app/_components/UserInfo";
import RecentExecutionLogs from "./_components/RecentExecutionLogs";

export default function Page() {
  return (
    <div className="w-[80%] my-5 mx-auto flex flex-col gap-6">
      <CreateJobBTN />
      <UserInfo />
      <RecentExecutionLogs />
    </div>
  );
}
