import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-rule/70 bg-clean/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="" width={40} height={40} />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg tracking-wide text-ink">
              POLI PINO PINAS
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Balikbayan Express
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
          <Link href="/dropoff" className="text-ink underline decoration-moss decoration-2 underline-offset-8">
            Send a Package
          </Link>
          <a href="#how-it-works" className="hover:text-ink">
            How It Works
          </a>
          <Link href="/track" className="hover:text-ink">
            Track a Package
          </Link>
        </nav>

        <Link
          href="/dropoff"
          className="rounded-full bg-moss px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-moss/90"
        >
          Send a Padala
        </Link>
      </div>
    </header>
  );
}
