import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-md px-6 py-24 text-center">
      <div className="han-serif text-6xl text-accent font-black">未找到</div>
      <div className="font-display italic text-5xl mt-3 text-ink">404</div>
      <p className="mt-5 text-muted">Page not found.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-ink text-white px-6 py-2.5 text-sm font-medium hover:bg-black transition"
      >
        Back to home
      </Link>
    </main>
  );
}
