"use client";

import { useEffect, useState } from "react";
import { BoxIcon } from "@/components/marketing/icons";

const TRACKING_API_URL =
  process.env.NEXT_PUBLIC_TRACKING_API_URL ?? "http://localhost:3001";

type TrackingResponse = {
  referenceNumber: string;
  recipientName: string;
  status: string;
  statusUpdatedAt: string;
  history: { status: string; changedAt: string }[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function TrackingTimeline({ reference }: { reference: string }) {
  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "not-found" }
    | { status: "error" }
    | { status: "found"; data: TrackingResponse }
  >({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    fetch(`${TRACKING_API_URL}/api/track/${encodeURIComponent(reference)}`)
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 404) {
          setState({ status: "not-found" });
          return;
        }
        if (!res.ok) throw new Error(`Unexpected status ${res.status}`);
        const data = (await res.json()) as TrackingResponse;
        setState({ status: "found", data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [reference]);

  if (state.status === "loading") {
    return (
      <div className="rounded-2xl border border-rule bg-surface p-6 text-left">
        <p className="text-sm text-ink-soft">Looking up {reference}…</p>
      </div>
    );
  }

  if (state.status === "not-found") {
    return (
      <div className="rounded-2xl border border-rule bg-surface p-6 text-left">
        <p className="font-semibold text-ink">We couldn&rsquo;t find that reference number.</p>
        <p className="mt-1 text-sm text-ink-soft">
          Double-check the number and try again, or contact the branch where you dropped
          off your box.
        </p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-2xl border border-rule bg-surface p-6 text-left">
        <p className="font-semibold text-ink">Tracking is temporarily unavailable.</p>
        <p className="mt-1 text-sm text-ink-soft">Please try again in a moment.</p>
      </div>
    );
  }

  const { data } = state;
  const history = [...data.history].reverse();

  return (
    <div className="rounded-2xl border border-rule bg-surface p-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
            Reference
          </p>
          <p className="font-serif text-xl text-ink">{data.referenceNumber}</p>
          <p className="mt-1 text-sm text-ink-soft">Recipient: {data.recipientName}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-moss/15 text-moss-text">
          <BoxIcon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-moss/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-moss-text">
        Current status: {data.status}
      </div>

      <ol className="mt-6 flex flex-col gap-6 border-l border-rule pl-5">
        {history.map((entry, i) => (
          <li key={`${entry.status}-${entry.changedAt}`} className="relative">
            <span
              className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full ${
                i === 0 ? "bg-forest" : "bg-moss/50"
              }`}
            />
            <p className="text-[11px] uppercase tracking-wide text-ink-soft">
              {formatDate(entry.changedAt)}
            </p>
            <p className="font-semibold text-ink">{entry.status}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
