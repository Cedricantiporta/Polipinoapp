import Link from "next/link";

export function UtilityBar() {
  return (
    <div className="bg-sage px-6 py-2 text-[11px] font-medium uppercase tracking-wider text-white/85 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <p className="italic normal-case tracking-normal text-white/95">
          Ship memories. Deliver love.
        </p>
        <div className="flex items-center gap-5">
          <a href="mailto:hello@polipinopinas.com" className="hidden hover:text-white sm:inline">
            Need Help?
          </a>
          <Link href="/login" className="hover:text-white">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
