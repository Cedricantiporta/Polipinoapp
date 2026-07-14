"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "ppp-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(CONSENT_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable - skip the banner rather than break the page
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-surface/95 p-4 backdrop-blur sm:p-5">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ink-soft">
          We use your browser&apos;s local storage only to save your in-progress
          drop-off form so you don&apos;t lose it on refresh — nothing is sent to a
          server or used for tracking or advertising. See our{" "}
          <Link href="/privacy" className="font-semibold text-moss-text underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => choose("declined")}
            className="rounded-lg border border-rule px-4 py-2 text-xs font-semibold text-ink-soft hover:border-moss"
          >
            Decline
          </button>
          <button
            onClick={() => choose("accepted")}
            className="rounded-lg bg-forest px-4 py-2 text-xs font-semibold text-white hover:bg-forest-dark"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
