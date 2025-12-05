"use client";
import { account } from "@/app/_lib/appwrite";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function useGetUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return { user, loading };
}
