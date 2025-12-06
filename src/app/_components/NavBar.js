"use client";
import Link from "next/link";
import style from "./NavBar.module.css";
import { usePathname } from "next/navigation";

/**
 * Public visitors & Registered users have access
 * @returns NavigationBar
 */
export default function NavBar() {
  const path = usePathname();

  if (path !== "/auth/signup" && path !== "/auth/signin")
    return (
      <div className={style.background}>
        <div className={style.navBar}>
          <h3>
            <Link href={"/"}>Cron-Job</Link>
          </h3>
        </div>
      </div>
    );
}
