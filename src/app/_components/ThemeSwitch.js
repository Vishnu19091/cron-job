"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAuth } from "../_contexts/AuthContext";

export default function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isSideBarOpen } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {isSideBarOpen ? (
        <button
          className="flex flex-row gap-2 cursor-pointer self-center"
          onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        >
          <span>{currentTheme === "dark" ? <Sun /> : <Moon />}</span>
          Switch to {currentTheme === "dark" ? "Light" : "Dark"} Mode
        </button>
      ) : (
        <span
          className="p-3 rounded hover:bg-(--SideBar_menu_item_hover)"
          title={`Switch to ${currentTheme === "dark" ? "Light" : "Dark"} Mode`}
          onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        >
          {currentTheme === "dark" ? <Sun /> : <Moon />}
        </span>
      )}
    </>
  );
}
