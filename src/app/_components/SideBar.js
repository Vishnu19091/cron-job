"use client";
import Link from "next/link";
import Logout from "./Logout";
import { LayoutDashboard, Calendar, Settings } from "lucide-react";
import { useState } from "react";
import style from "./SideBar.module.css";

const Menu = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    href: "/dashboard",
  },
  {
    name: "Jobs",
    icon: <Calendar size={20} />,
    href: "/jobs",
  },
  { name: "Settings", icon: <Settings size={20} />, href: "/settings" },
];

export default function SideBar() {
  const [open, setOpen] = useState(true);

  return (
    <div className={style.side_bar_wrapper}>
      {/* Sidebar */}
      <div
        className={`
          ${style.side_bar}
          ${open ? "w-fit" : "w-20"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-6">
          {open && <h1 className="text-xl font-semibold">Cron-Job</h1>}
        </div>

        {/* Menu Items */}
        <nav className="w-fit mx-auto">
          {Menu.map((item, i) => (
            <Link key={i} href={item.href} title={item.name}>
              <div
                className={`
                  flex items-center gap-3 cursor-pointer px-4 py-3 
                  hover:bg-zinc-900 transition-all rounded-xl mx-2 w-fit
                `}
              >
                {item.icon}
                {open && (
                  <span className="text-sm text-white">{item.name}</span>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {open && (
          <div>
            <hr className="w-28 mx-auto my-5" />

            <div className="flex justify-center">
              {/* Use global context for user state,
          the below element requires the user data */}
              {/* <p>Signed in as {user}</p> */}
              <Logout />
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-6 -right-2 bg-white text-black rounded-full p-1 shadow-md"
      >
        {open ? "<" : ">"}
      </button>
    </div>
  );
}
