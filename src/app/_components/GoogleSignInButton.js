import Image from "next/image";

import { continueWithGoogle } from "@/app/_lib/server/oauth";
import styles from "./GoogleSignInButton.module.css";

function GoogleSignInButton() {
  return (
    <form action={continueWithGoogle}>
      <button className={styles.google_btn}>
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default GoogleSignInButton;
