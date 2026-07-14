import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-clean">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="" width={32} height={32} />
              <span className="font-serif text-base tracking-wide text-ink">
                POLI PINO PINAS
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              We connect families. We deliver what matters most.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              Explore
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-ink">
              <li>
                <Link href="/dropoff" className="hover:text-moss">
                  Send a Package
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-moss">
                  Track a Package
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-moss">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              Support
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-ink">
              <li>
                <a href="mailto:hello@polipinopinas.com" className="hover:text-moss">
                  hello@polipinopinas.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-rule pt-6 text-xs text-ink-soft sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Poli Pino Pinas. Filipino Cultural Store.</p>
        </div>
      </div>
    </footer>
  );
}
