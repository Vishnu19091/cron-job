"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/app/_lib/appwrite";
import { Account } from "appwrite";
import Logout from "./Logout";
import { redirect } from "next/navigation";

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const account = new Account(client);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
        redirect("/auth/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
