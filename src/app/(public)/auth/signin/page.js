"use client";
import Link from "next/link";
import styles from "./signin.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswdIPField from "@/app/(public)/auth/_components/PasswdIPField";
import EmailField from "../_components/EmailField";
import GoogleSignInButton from "@/app/_components/GoogleSignInButton";
import { toast } from "react-toastify";

export default function Page() {
  const [email, setEmail] = useState(null | "");
  const [passwd, setPasswd] = useState(null | "");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!email || !passwd) {
      toast.error("All fields are required");
      return;
    }

    if (passwd.length <= 7) {
      toast.warning("Password must be at least 8 characters");
      return;
    }

    const toastId = toast.loading("Signing In...");

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email: email, password: passwd }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        const errormsg = JSON.parse(data.error.response);

        throw new Error(errormsg.message);
      }

      router.push("/dashboard");

      toast.update(toastId, {
        render: "Signed In successfully",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "SignIn failed",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.title}>Sign In</div>

      <form className={styles.form} onSubmit={onFormSubmit}>
        <EmailField setEmail={setEmail} />

        <PasswdIPField setPasswd={setPasswd} />

        <button type="submit" className={styles.primaryBtn}>
          {loading ? "Signing In..." : "Sign In"}
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
