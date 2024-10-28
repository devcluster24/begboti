import Link from "next/link";
import { IoWarning } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col gap-y-1">
      <IoWarning className="text-5xl" />
      <h2 className="text-3xl font-bold">Not Found</h2>
      <Link
        className="bg-red-600 px-4 py-2 rounded-lg text-white font-medium"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
