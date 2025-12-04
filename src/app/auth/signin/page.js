"use client";
import Link from "next/link";
import styles from "./signin.module.css";
import { Account } from "appwrite";
import { client } from "@/app/_lib/appwrite";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswdIPField from "@/app/auth/_components/PasswdIPField";
import EmailField from "../_components/EmailField";

export default function Page() {
  const account = new Account(client);
  const [email, setEmail] = useState(null | "");
  const [passwd, setPasswd] = useState(null | "");
  const router = useRouter();

  async function onFormSubmit(e) {
    e.preventDefault();

    if (email && passwd && email.length > 5 && passwd.length > 8) {
      try {
        const result = await account.createEmailPasswordSession({
          email: email,
          password: passwd,
        });
        console.log(result);
        if (result) {
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
    </div>
  );
}
