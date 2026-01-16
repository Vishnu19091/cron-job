"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  PanelRight,
  Menu as MenuIcon,
  X,
  CircleUserIcon,
} from "lucide-react";
import style from "./SideBar.module.css";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { useAuth } from "@/app/_contexts/AuthContext";
import { useEffect, useState } from "react";

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
  const { userName, userAvatar, isSideBarOpen, dispatch } = useAuth();

  // For active tab Link bg highlighting
  const pathName = usePathname();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }),
    [];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        className={style.mobile_menu_btn}
        onClick={() =>
          dispatch({ type: "Toggle_Side_Bar", payload: !isSideBarOpen })
        }
      >
        {!isSideBarOpen ? <MenuIcon size={20} /> : <X />}
      </button>

      <div
        className={`relative h-screen flex ${
          !isSideBarOpen ? "lg:w-[72px] sm:w-0" : "lg:w-[15%] sm:w-0"
        }`}
      >
        <div
          className={`${style.side_bar} ${
            isSideBarOpen ? style.side_bar_expanded : style.side_bar_collapsed
          }`}
        >
          {/* LOGO */}
          <div className="flex w-full justify-between items-center gap-3 px-4 py-6">
            {isSideBarOpen && hydrated && (
              <h1 className="text-xl font-semibold">Cron-Job</h1>
            )}

            {/* SIDEBAR TOGGLE BUTTON */}
            <PanelRight
              className={`${style.toggle_button} ${
                !isSideBarOpen ? style.toggle_button_collapsed : ""
              }`}
              onClick={() =>
                dispatch({ type: "Toggle_Side_Bar", payload: !isSideBarOpen })
              }
            />
          </div>

          {/* MENU */}
          <nav className={style.menu}>
            {Menu.map((item, i) => (
              <Link key={i} href={item.href} title={item.name}>
                <div
                  className={`${style.menu_item} ${
                    pathName === item.href ? style.menu_item_active : ""
                  }
                ${!isSideBarOpen ? style.menu_item_collapsed : ""}
                `}
                >
                  {item.icon}
                  {isSideBarOpen && (
                    <span className="text-sm">{item.name}</span>
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* FOOTER */}
          {isSideBarOpen && (
            <div className={style.sidebar_footer}>
              <hr className={style.divider} />
              <div className="flex flex-row gap-3 justify-center items-center mb-2">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="User Avatar"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <CircleUserIcon height={35} width={35} />
                )}
                <span>{userName}</span>
              </div>
              <SignOutButton />

              <a
                className="flex gap-2 justify-center hover:text-blue-500 mt-4"
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
          )}
        </div>
      </div>
    </>
  );
}
