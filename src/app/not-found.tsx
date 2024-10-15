import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-36 z-50 text-2xl">
      <h2 className="uppercase">Oops, nothing here</h2>
      <Link href="/" className="uppercase link">
        Return Home →
      </Link>
    </div>
  );
}
