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

            <div className="flex flex-col items-center gap-4">
              {/* Use global context for user state,
          the below element requires the user data */}
              {/* <p>Signed in as {user}</p> */}
              <Logout />

              <a
                className="flex flex-row gap-2 hover:text-blue-500"
                href="https://github.com/Vishnu19091/cron-job"
              >
                <span>Repository</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  width={30}
                  height={30}
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
                </svg>
              </a>
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
