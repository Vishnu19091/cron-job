"use client";

import Logout from "./Logout";
import { useGetUser } from "../auth/_hooks/useGetUser";

export default function UserInfo() {
  const { user, loading } = useGetUser();

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!user) {
    return <p>Please log in to access the dashboard.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <Logout />
    </div>
  );
}
