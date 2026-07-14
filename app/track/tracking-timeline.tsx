import { BoxIcon } from "@/components/marketing/icons";

const sampleWaypoints = [
  {
    date: "Jul 20, 2026 · 09:30 AM",
    title: "Arrived at Destination Hub",
    place: "Manila, Philippines",
    done: true,
  },
  {
    date: "Jul 19, 2026 · 03:15 PM",
    title: "In Transit",
    place: "Departed carrier facility",
    done: true,
  },
  {
    date: "Jul 18, 2026 · 08:45 AM",
    title: "Arrived at Origin Branch",
    place: "London, United Kingdom",
    done: true,
  },
  {
    date: "Jul 17, 2026 · 11:20 AM",
    title: "Shipment Created",
    place: "London, United Kingdom",
    done: true,
  },
];

export function TrackingTimeline({ reference }: { reference: string }) {
  return (
    <div className="rounded-2xl border border-rule bg-surface p-6 text-left">
      <div className="mb-2 flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold">
        Sample preview — not live data
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
            Reference
          </p>
          <p className="font-serif text-xl text-ink">{reference || "PPP-XXXXXX"}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-moss/15 text-moss">
          <BoxIcon className="h-5 w-5" />
        </div>
      </div>

      <ol className="mt-6 flex flex-col gap-6 border-l border-rule pl-5">
        {sampleWaypoints.map((wp, i) => (
          <li key={i} className="relative">
            <span
              className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full ${
                i === 0 ? "bg-forest" : "bg-moss/50"
              }`}
            />
            <p className="text-[11px] uppercase tracking-wide text-ink-soft">{wp.date}</p>
            <p className="font-semibold text-ink">{wp.title}</p>
            <p className="text-sm text-ink-soft">{wp.place}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 border-t border-rule pt-4 text-xs text-ink-soft">
        This is placeholder data to preview the tracking layout. Once connected to a
        real carrier (e.g. FedEx or DHL), this page will pull live status instead.
      </p>
    </div>
  );
}
