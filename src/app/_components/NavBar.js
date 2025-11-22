import Link from "next/link";
import style from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={style.background}>
      <div className={style.navBar}>
        <h3>
          <Link href={"/"}>Cron-Job</Link>
        </h3>

        <nav>
          <ul className={style.navLinks}>
            <Link href={"auth"}>SignUp</Link>
            <Link href={"auth"}>SignIn</Link>

            {/* Display the dashboard & Jobs link only if the User exist and logged in */}
            <Link href={"dashboard"}>Dashboard</Link>
            <Link href={"jobs"}>Jobs</Link>
            <Link href={"settings"}>Settings</Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}
