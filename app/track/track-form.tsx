"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/marketing/icons";

export function TrackForm() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-rule bg-surface p-6 text-left">
        <p className="text-sm font-semibold text-ink">
          Thanks — we&apos;ve noted reference{" "}
          <span className="text-moss">{value || "(none entered)"}</span>.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Live tracking isn&apos;t connected yet, so this doesn&apos;t look anything up
          automatically. Email us at{" "}
          <a href="mailto:hello@polipinopinas.com" className="font-semibold text-moss">
            hello@polipinopinas.com
          </a>{" "}
          with this reference number and we&apos;ll follow up directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex items-center gap-2 rounded-full border border-rule bg-surface p-1.5 pl-5 shadow-sm"
    >
      <SearchIcon className="h-4 w-4 shrink-0 text-ink-soft" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="PPP-XXXXXX-XXXX"
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-ink outline-none placeholder:text-ink-soft/50"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-moss px-5 py-2.5 text-sm font-semibold text-white hover:bg-moss/90"
      >
        Track
      </button>
    </form>
  );
}
