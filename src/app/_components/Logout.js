import { Account } from "appwrite";
import { client } from "../_lib/appwrite";
import { redirect } from "next/navigation";
import style from "./Log.out.module.css";

export default function Logout() {
  async function onClick() {
    const account = new Account(client);

    const result = await account.deleteSessions();

    redirect("/auth/signin");
  }

  return (
    <button onClick={onClick} className={style.logout}>
      Signout
    </button>
  );
}
