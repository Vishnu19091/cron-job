"use client";
import Link from "next/link";
import style from "./NavBar.module.css";
import { usePathname } from "next/navigation";

/**
 * Must be in the left side of the viewport
 * same applies to mobile devices
 * and for mobile device modal window must be given
 * @returns NavigationBar
 */
export default function NavBar() {
  const path = usePathname();

  console.log(path);

  if (path !== "/auth/signup" && path !== "/auth/signin")
    return (
      <div className={style.background}>
        <div className={style.navBar}>
          <h3>
            <Link href={"/"}>Cron-Job</Link>
          </h3>

          <nav>
            <ul className={style.navLinks}>
              {/* {!user && (
              <button onClick={LoginWithGoogle} className={style.googleBtn}>
                Continue with Google
              </button>
            )} */}

              {/* Display the dashboard & Jobs link only if the User exist and logged in */}
              {/* {user && (
              <>
                <Link href={"/dashboard"}>Dashboard</Link>
                <Link href={"/jobs"}>Jobs</Link>
                <Link href={"/settings"}>Settings</Link>
              </>
            )} */}
            </ul>
          </nav>
        </div>
      </div>
    );
}
