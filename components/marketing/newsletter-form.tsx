"use client";

import { useState } from "react";
import { ArrowRightIcon } from "./icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="text-sm text-ink-soft">
        Thanks — noted. This is a draft form, not connected to a mailing list yet,
        so nothing was actually sent anywhere.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex items-center gap-1 rounded-lg border border-rule bg-surface p-1 pl-4 shadow-sm"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-ink outline-none placeholder:text-ink-soft/60"
      />
      <button
        type="submit"
        aria-label="Sign up"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-forest text-white hover:bg-forest-dark"
      >
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
