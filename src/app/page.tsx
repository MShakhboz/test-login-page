import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Link
        href="/login"
        className="inline-block p-5 bg-primary rounded-2xl text-white"
      >
        Sign out
      </Link>
    </div>
  );
}
