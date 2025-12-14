"use client";
import Link from "next/link";
import styles from "./signup.module.css";
import { ID } from "appwrite";
import { useState } from "react";
import PasswdIPField from "@/app/(public)/auth/_components/PasswdIPField";
import EmailField from "@/app/(public)/auth/_components/EmailField";
import GoogleSignInButton from "@/app/_components/GoogleSignInButton";

export default function Page() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      userName &&
      email &&
      passwd &&
      userName.length > 4 &&
      email.length > 5 &&
      passwd.length > 8
    ) {
      try {
        const user = await account.create({
          userId: ID.unique(),
          email: email,
          password: passwd,
          name: userName,
        });
        router.push("/auth/signin");
      } catch (error) {
        console.error("Unable to register a new user!", error);
      }
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.title}>Sign Up</div>

      <p className={styles.subtitle}>Please enter your details to sign up</p>

      <form className={styles.form} onSubmit={onFormSubmit}>
        <input
          placeholder="John Doe *"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />

        <EmailField setEmail={setEmail} />

        <PasswdIPField setPasswd={setPasswd} />

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
      <p>or</p>
      <GoogleSignInButton />
    </div>
  );
}
