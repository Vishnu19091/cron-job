"use client";
import SideBar from "@/app/_components/SideBar";
import { useGetUser } from "@/app/_hooks/useGetUser";

/**
 * This Layout is only applied to (app) route group

 * **And this is a protected route group**

 * **which means only registered user accounts can have access**

 * Renders the main application only to registered user accounts
 */
export default function AppLayout({ children }) {
  const { user } = useGetUser();

  if (user)
    return (
      <main className="flex flex-row">
        <SideBar />
        {children}
      </main>
    );
}
