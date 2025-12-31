import { LogOut } from "lucide-react";
import { signOut } from "../_lib/server/server-data-service";

function SignOutButton() {
  return (
    <form action={signOut} className="w-fit mx-auto">
      <button
        // title={`Logout session from ${userProvider}`}
        className="py-3 px-3 hover:bg-white hover:text-black border border-white transition-colors duration-300 flex flex-row items-center gap-4 font-semibold cursor-pointer"
      >
        <LogOut />
        <span>LogOut</span>
      </button>
    </form>
  );
}

export default SignOutButton;
