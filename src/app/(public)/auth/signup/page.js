"use client";
import Link from "next/link";
import styles from "./signup.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswdIPField from "@/app/(public)/auth/_components/PasswdIPField";
import EmailField from "@/app/(public)/auth/_components/EmailField";
import GoogleSignInButton from "@/app/_components/GoogleSignInButton";
import { toast } from "react-toastify";

export default function Page() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userName || !email || !passwd) {
      toast.error("All fields are required");
      return;
    }

    if (userName.length <= 6) {
      toast.warning("Username must be at least 7 characters");
      return;
    }

    if (passwd.length <= 8) {
      toast.warning("Password must be at least 9 characters");
      return;
    }

    const toastId = toast.loading("Creating your account...");

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userName,
            email: email,
            password: passwd,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);

        throw new Error(data.error);
      }

      toast.update(toastId, {
        render: "Account created successfully 🎉",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });

      setLoading(false);

      if (response.status == 201) {
        setTimeout(() => {
          router.push("/auth/signin");
        }, 4000);
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Signup failed",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });

      console.error("Unable to register a new user!", error);
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

        <button type="submit" disabled={loading} className={styles.primaryBtn}>
          {loading ? "Signing up..." : "Sign Up"}
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
