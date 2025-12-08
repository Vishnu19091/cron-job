import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavBar from "@/app/_components/NavBar";
import SideBar from "../_components/SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cron Job",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
}
