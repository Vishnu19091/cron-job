import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner message="Loading..." />
    </div>
  );
}
