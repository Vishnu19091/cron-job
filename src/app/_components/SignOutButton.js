import { signOutAction } from "@/app/_lib/actions";
import { signOutUser } from "@/app/_lib/data-service";

import { LogOut } from "lucide-react";
import { useAuth } from "@/app/_contexts/AuthContext";

/*
A common signoutbutton to signout user (automatically determine loggedin session)

TODO
1. Use Context API to fetch session authorization(AppWrite | Google)
2. Based on the authorization, change the action() to relevant function
that is, if it's AppWrite session then in the place of form action
use (signOutUser from @/app/_lib/data-service);

else if it's Google OAuth session,
then use (signOutAction() from @/app/_lib/actions)

based on the session, use a small piece of state that holds the information about it
*/
function SignOutButton() {
  const { userProvider } = useAuth();

  return (
    <form
      action={userProvider === "Google" ? signOutAction : signOutUser}
      className="w-fit mx-auto"
    >
      <button
        title={`Logout session from ${userProvider}`}
        className="py-3 px-3 hover:bg-white hover:text-black border border-white transition-colors duration-300 flex flex-row items-center gap-4 font-semibold cursor-pointer"
      >
        <LogOut />
        <span>LogOut</span>
      </button>
    </form>
  );
}

export default SignOutButton;
