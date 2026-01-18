"use client";
import { CircleCheck, Clock } from "lucide-react";
import BoxCard from "../(app)/dashboard/_components/BoxCard";
import { useAuth } from "../_contexts/AuthContext";

export default function UserInfo() {
  const {
    userId,
    isLoading,
    userName,
    userEmail,
    userVerified,
    totalJobs,
    totalActiveJobs,
  } = useAuth();
  if (isLoading) return <p>Loading user data...</p>;

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <section className="flex flex-row gap-4">
        <p>Email: {userEmail}</p>
        <p className={`${userVerified ? "text-green-400" : "text-red-400"}`}>
          User {userVerified ? "Verified!" : "not verified"}
        </p>
      </section>

      <div className="flex flex-row gap-5">
        <BoxCard icon={<Clock />} title="Total Jobs" data={totalJobs} />
        <BoxCard
          icon={<CircleCheck />}
          title="Active Jobs"
          data={totalActiveJobs}
        />
      </div>
    </div>
  );
}
