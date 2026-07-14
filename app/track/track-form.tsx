"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/marketing/icons";
import { TrackingTimeline } from "./tracking-timeline";

export function TrackForm() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <TrackingTimeline reference={value} />;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex items-center gap-3 rounded-lg border border-rule bg-surface p-2 pl-6 shadow-sm"
    >
      <SearchIcon className="h-5 w-5 shrink-0 text-ink-soft" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="PPP-XXXXXX-XXXX"
        className="min-w-0 flex-1 bg-transparent py-3 text-base text-ink outline-none placeholder:text-ink-soft/50"
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-forest px-7 py-3.5 text-base font-semibold text-white hover:bg-forest-dark"
      >
        Track
      </button>
    </form>
  );
}
