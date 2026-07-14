"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { SiteChrome } from "@/components/marketing/site-chrome";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-1 flex-col bg-clean">
      <SiteChrome />
      <main className="flex-1">
        <section className="mx-auto max-w-sm px-4 py-20 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss-text">
            Welcome Back
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium italic text-ink">
            Log in
          </h1>

          <div className="mt-4 rounded-xl border border-dashed border-rule bg-green-mist/30 p-3 text-xs text-ink-soft">
            Draft preview — accounts aren&apos;t connected to a real backend yet.
            Submitting just shows what the account experience would look like.
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/account");
            }}
            className="mt-6 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-rule bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/25"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full rounded-md border border-rule bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/25"
              />
            </div>
            <button
              type="submit"
              className="mt-2 rounded-lg bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-dark"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-ink-soft">
            Don&apos;t have an account yet? Accounts are coming soon —{" "}
            <Link href="/dropoff" className="font-semibold text-moss-text">
              send a package
            </Link>{" "}
            without one for now.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
