"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dropoff", label: "Send a Package" },
  { href: "/track", label: "Track a Package" },
  { href: "#how-it-works", label: "How It Works" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-rule/70 bg-clean/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-sage.svg" alt="" width={40} height={40} />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg tracking-wide text-ink">
              POLI PINO PINAS
            </span>
            <span className="mt-1 whitespace-nowrap text-[10px] font-normal uppercase tracking-[0.1em] text-sage sm:tracking-[0.22em]">
              Balikbayan Express
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith("#");
            const active = !isAnchor && pathname === item.href;
            return isAnchor ? (
              <a key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-ink underline decoration-moss decoration-2 underline-offset-8"
                    : "hover:text-ink"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/dropoff"
          className="shrink-0 whitespace-nowrap rounded-full bg-sage px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-moss-text sm:px-5 sm:py-2.5 sm:text-sm"
        >
          Send a Padala
        </Link>
      </div>
    </header>
  );
}
