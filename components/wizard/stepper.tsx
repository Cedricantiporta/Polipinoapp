"use client";

const labels = ["Consignee", "Boxes", "Terms", "Sender ID", "Review"];

export function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {labels.map((label, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  active
                    ? "bg-moss text-white"
                    : done
                      ? "bg-moss/20 text-moss"
                      : "bg-white/60 text-ink-soft"
                }`}
              >
                {n}
              </div>
              <span
                className={`hidden text-[10px] uppercase tracking-wide sm:block ${
                  active ? "text-white" : "text-white/70"
                }`}
              >
                {label}
              </span>
            </div>
            {n < labels.length ? (
              <div className="h-px w-4 bg-white/30 sm:w-8" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
