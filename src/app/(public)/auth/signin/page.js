"use client";
import Link from "next/link";
import styles from "./signin.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswdIPField from "@/app/(public)/auth/_components/PasswdIPField";
import EmailField from "../_components/EmailField";
import GoogleSignInButton from "@/app/_components/GoogleSignInButton";

export default function Page() {
  const [email, setEmail] = useState(null | "");
  const [passwd, setPasswd] = useState(null | "");
  const router = useRouter();

  async function onFormSubmit(e) {
    e.preventDefault();

    if (email && passwd) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email: email, password: passwd }),
          }
        );

        const data = await response.json();

        if (response.status == 201 && data.message) {
          router.push("/dashboard");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // Later pop up a toast with missing input field
      alert(`Complete * mentioned input fields`);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.title}>Sign In</div>

      <form className={styles.form} onSubmit={onFormSubmit}>
        <EmailField setEmail={setEmail} />

        <PasswdIPField setPasswd={setPasswd} />

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

      <p>or</p>

      <GoogleSignInButton />
    </div>
  );
}
