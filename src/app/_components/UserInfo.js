"use client";
import { useAuth } from "../_contexts/AuthContext";

export default function UserInfo() {
  const { isLoading, userName, userEmail } = useAuth();
  if (isLoading) return <p>Loading user data...</p>;

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <p>Email: {userEmail}</p>
    </div>
  );
}
