"use client";
import Link from "next/link";
import styles from "./signup.module.css";
import { Account, ID } from "appwrite";
import { client } from "@/app/_lib/appwrite";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Page() {
  const account = new Account(client);

  const [userName, setUserName] = useState(null | "");
  const [email, setEmail] = useState(null | "");
  const [passwd, setPasswd] = useState(null | "");

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
      } catch (error) {
        console.error("Unable to register a new user!", error);
      }
      redirect("/auth/signin");
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

        <input
          placeholder="jon.doe@gmail.com *"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Enter a password *"
          type="password"
          onChange={(e) => setPasswd(e.target.value)}
        />

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
