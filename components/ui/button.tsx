import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary:
    "bg-moss text-white hover:bg-moss/90 disabled:bg-moss/40 disabled:cursor-not-allowed",
  secondary:
    "bg-surface text-ink border border-rule hover:border-moss disabled:opacity-40",
  ghost: "bg-transparent text-ink-soft hover:text-ink disabled:opacity-40",
  danger: "bg-transparent text-red-600 hover:text-red-700 disabled:opacity-40",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${variants[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
