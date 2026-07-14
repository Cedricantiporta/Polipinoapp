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
      className="flex items-center gap-2 rounded-lg border border-rule bg-surface p-1.5 pl-5 shadow-sm"
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
        className="shrink-0 rounded-md bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-dark"
      >
        Track
      </button>
    </form>
  );
}
