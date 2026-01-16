"use client";
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
      <p>
        ID <span className=" bg-[#191919] p-2 rounded">{userId}</span>
      </p>
      <p>Email: {userEmail}</p>
      <p className={`${userVerified} ? text-green-400 : text-red-400`}>
        User {userVerified ? "Verified!" : "not verified"}
      </p>

      <p>Total Cron Jobs - {totalJobs}</p>
      <p>Total Active Cron Jobs - {totalActiveJobs}</p>
    </div>
  );
}
