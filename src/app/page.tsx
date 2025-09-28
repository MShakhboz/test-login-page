import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Link href="/login">Sign out</Link>
    </div>
  );
}
