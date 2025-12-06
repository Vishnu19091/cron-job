"use client";
import { redirect } from "next/navigation";
import { useGetUser } from "../../_hooks/useGetUser";

export default function Page() {
  const { user } = useGetUser();

  if (!user) {
    redirect("/auth/signin");
  } else if (user) {
    redirect("/dashboard");
  }
}
