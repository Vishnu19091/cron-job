import Image from "next/image";
import style from "./_styles/page.module.css";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start md:items-center">
        <h3 className="text-4xl font-bold">Project is in development</h3>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Vishnu19091/cron-job"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="Globe icon"
            width={40}
            height={40}
          />
          Repository →
        </a>
      </footer>
    </div>
  );
}
