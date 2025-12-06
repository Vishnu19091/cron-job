"use client";
import Link from "next/link";
import styles from "./signup.module.css";
import { ID } from "appwrite";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import PasswdIPField from "@/app/(public)/auth/_components/PasswdIPField";
import EmailField from "@/app/(public)/auth/_components/EmailField";
import { useGetUser } from "@/app/_hooks/useGetUser";

export default function Page() {
  const { user } = useGetUser();
  if (user) {
    redirect("/dashboard");
  }

  const [userName, setUserName] = useState(null | "");
  const [email, setEmail] = useState(null | "");
  const [passwd, setPasswd] = useState(null | "");
  const router = useRouter();

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

        {/* <button onClick={loginWithGoogle}>
          <span>Google Icon</span>
          Continue with Google
        </button> */}

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
