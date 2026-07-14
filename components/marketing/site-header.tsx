"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MenuIcon, CloseIcon } from "./icons";

const navItems = [
  { href: "/dropoff", label: "Send a Package" },
  { href: "/track", label: "Track a Package" },
  { href: "/#how-it-works", label: "How It Works" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="relative border-b border-rule/70 bg-clean/90 backdrop-blur">
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
              const active = !item.href.includes("#") && pathname === item.href;
              return (
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

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/dropoff"
              className="hidden whitespace-nowrap rounded-lg bg-sage px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-dark sm:inline-block sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Send a Padala
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-rule text-ink md:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && mounted
        ? createPortal(
            <div className="fixed inset-0 z-[60] flex flex-col bg-clean md:hidden">
              <div className="flex items-center justify-between border-b border-rule/70 px-6 py-4">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <Image src="/logo-sage.svg" alt="" width={36} height={36} />
                  <span className="font-serif text-lg tracking-wide text-ink">
                    POLI PINO PINAS
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-rule text-ink"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8">
                {navItems.map((item) => {
                  const active = !item.href.includes("#") && pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-lg px-3 py-3 text-lg font-medium ${
                        active
                          ? "bg-moss/10 text-ink"
                          : "text-ink-soft hover:bg-moss/5 hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-rule/70 px-6 py-6">
                <Link
                  href="/dropoff"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-lg bg-sage px-5 py-3 text-sm font-semibold text-white hover:bg-forest-dark"
                >
                  Send a Padala
                </Link>
                <div className="mt-6 flex flex-col gap-4 text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  <a
                    href="mailto:hello@polipinopinas.com"
                    onClick={() => setOpen(false)}
                    className="hover:text-ink"
                  >
                    Need Help?
                  </a>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="hover:text-ink"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
