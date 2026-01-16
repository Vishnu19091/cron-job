import Link from "next/link";

function NotFound() {
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block border border-white px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
