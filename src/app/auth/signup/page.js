import Link from "next/link";
import styles from "./signup.module.css";

export default function Page() {
  return (
    <div className={styles.card}>
      <div className={styles.title}>Sign Up</div>

      <p className={styles.subtitle}>Please enter your details to sign up</p>

      <form className={styles.form}>
        <div className="grid grid-cols-2 gap-2">
          <input placeholder="John *" type="text" />
          <input placeholder="Doe *" type="text" />
        </div>
        <input placeholder="jon.doe@gmail.com *" type="email" />
        <input placeholder="Enter a password *" type="password" />
        <button type="submit" className={styles.primaryBtn}>
          Sign up
        </button>

        <Link href={"/auth/signin"} className="w-fit cursor-default">
          Already a user? {""}
          <span className="text-violet-300 hover:text-violet-500 w-fit cursor-pointer">
            Sign In
          </span>
        </Link>
      </form>
    </div>
  );
}
