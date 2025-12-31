"use client";
import { useAuth } from "../_contexts/AuthContext";

export default function UserInfo() {
  const { isLoading, userName, userEmail, userVerified } = useAuth();
  if (isLoading) return <p>Loading user data...</p>;

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <p>Email: {userEmail}</p>
      {/* <p className={`${userVerified} ? text-green-400 : text-red-400`}>
        {userVerified ? "Verified!" : "not verified"}
      </p> */}
    </div>
  );
}
