import Image from "next/image";

import { continueWithGoogle } from "@/app/_lib/server/oauth";

function GoogleSignInButton() {
  return (
    <form action={continueWithGoogle}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium cursor-pointer">
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
