import SideBar from "@/app/_components/SideBar";
import { AuthProvider } from "../_contexts/AuthContext";

/**
 * This Layout is only applied to (app) route group

 * **And this is a protected route group**

 * **which means only registered user accounts can have access**

 * Renders the main application only to registered user accounts

 * Refer middleware.js
 */
export default function AppLayout({ children }) {
  return (
    <main className="flex flex-row">
      <AuthProvider>
        <SideBar />
        {children}
      </AuthProvider>
    </main>
  );
}
