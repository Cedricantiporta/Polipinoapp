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
          className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-dark"
        >
          Send a Padala
        </Link>
      </div>
    </header>
  );
}
