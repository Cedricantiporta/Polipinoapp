import type { ReactNode } from "react";

export function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label
        htmlFor={htmlFor}
        className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft"
      >
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

const controlBase =
  "w-full rounded-md border border-rule bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-moss focus:ring-2 focus:ring-moss/25";

export function inputClass(hasError?: boolean) {
  return `${controlBase} ${hasError ? "border-red-400" : ""}`;
}
