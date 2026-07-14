"use client";

import type { ReactNode } from "react";
import { Button } from "./button";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full flex-col rounded-t-2xl bg-surface p-6 shadow-xl sm:max-w-lg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 font-serif text-xl text-ink">{title}</h2>
        <div className="flex-1 overflow-y-auto pr-1 text-sm leading-relaxed text-ink-soft">
          {children}
        </div>
        <Button variant="secondary" onClick={onClose} className="mt-5 self-center">
          Close
        </Button>
      </div>
    </div>
  );
}
