import Link from "next/link";
import styles from "./signin.module.css";

export default function Page() {
  return (
    <div className={styles.card}>
      <div className={styles.title}>Sign In</div>

      <form className={styles.form}>
        <input placeholder="Enter Email" type="email" />
        <input placeholder="Enter password" type="password" />
        <button type="submit" className={styles.primaryBtn}>
          Sign In
        </button>

        <Link href={"/auth/signup"} className="w-fit cursor-default">
          New user? {""}
          <span className="text-violet-300 hover:text-violet-500 w-fit cursor-pointer">
            Sign Up
          </span>
        </Link>
      </form>
    </div>
  );
}
