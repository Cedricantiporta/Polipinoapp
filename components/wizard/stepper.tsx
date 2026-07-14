"use client";

const labels = ["Consignee", "Boxes", "Terms", "Sender ID", "Review"];

export function Stepper({
  step,
  orientation = "vertical",
}: {
  step: number;
  orientation?: "vertical" | "horizontal";
}) {
  if (orientation === "horizontal") {
    return (
      <div>
        <ol className="flex items-center">
          {labels.map((label, i) => {
            const n = i + 1;
            const active = n === step;
            const done = n < step;
            return (
              <li key={label} className="flex flex-1 items-center last:flex-none">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                    active
                      ? "bg-sage text-white"
                      : done
                        ? "bg-moss/20 text-moss-text"
                        : "border border-rule bg-surface text-ink-soft"
                  }`}
                >
                  {n}
                </div>
                {n < labels.length ? (
                  <div className={`mx-1.5 h-px flex-1 ${done ? "bg-moss" : "bg-rule"}`} />
                ) : null}
              </li>
            );
          })}
        </ol>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-moss-text">
          Step {step} of {labels.length}: {labels[step - 1]}
        </p>
      </div>
    );
  }

  return (
    <ol className="flex flex-col gap-1">
      {labels.map((label, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <li key={label} className="flex items-stretch gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  active
                    ? "bg-sage text-white"
                    : done
                      ? "bg-moss/20 text-moss-text"
                      : "border border-rule bg-surface text-ink-soft"
                }`}
              >
                {n}
              </div>
              {n < labels.length ? (
                <div className={`my-1 w-px flex-1 ${done ? "bg-moss" : "bg-rule"}`} />
              ) : null}
            </div>
            <p
              className={`pb-6 pt-1.5 text-sm font-semibold ${
                active || done ? "text-ink" : "text-ink-soft"
              }`}
            >
              {label}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
