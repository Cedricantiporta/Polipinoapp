"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Box, Consignee, SenderId, Terms } from "./schema";
import { STORAGE_KEY } from "./schema";

export const STEP_COUNT = 5;

export interface DraftState {
  consignee?: Consignee;
  boxes: Box[];
  terms?: Terms;
  sender?: SenderId;
}

const emptyBox: Box = { items: [] };

interface WizardContextValue {
  step: number;
  draft: DraftState;
  setStep: (step: number) => void;
  goNext: () => void;
  goBack: () => void;
  setConsignee: (value: Consignee) => void;
  setBoxes: (value: Box[]) => void;
  setTerms: (value: Terms) => void;
  setSender: (value: SenderId) => void;
  resetDraft: () => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

function loadInitial(): { draft: DraftState; step: number } {
  if (typeof window === "undefined") {
    return { draft: { boxes: [emptyBox] }, step: 1 };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { draft: { boxes: [emptyBox] }, step: 1 };
    const parsed = JSON.parse(raw);
    return {
      draft: parsed.draft ?? { boxes: [emptyBox] },
      step: parsed.step ?? 1,
    };
  } catch {
    return { draft: { boxes: [emptyBox] }, step: 1 };
  }
}

export function WizardProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<DraftState>({ boxes: [emptyBox] });

  useEffect(() => {
    const initial = loadInitial();
    setDraft(initial.draft);
    setStep(initial.step);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ draft, step }));
    } catch {
      // storage quota exceeded (e.g. large ID photo) - draft just won't persist across reloads
    }
  }, [draft, step, ready]);

  const value = useMemo<WizardContextValue>(
    () => ({
      step,
      draft,
      setStep: (s) => setStep(s),
      goNext: () => setStep((s) => Math.min(STEP_COUNT, s + 1)),
      goBack: () => setStep((s) => Math.max(1, s - 1)),
      setConsignee: (consignee) => setDraft((d) => ({ ...d, consignee })),
      setBoxes: (boxes) => setDraft((d) => ({ ...d, boxes })),
      setTerms: (terms) => setDraft((d) => ({ ...d, terms })),
      setSender: (sender) => setDraft((d) => ({ ...d, sender })),
      resetDraft: () => {
        setDraft({ boxes: [emptyBox] });
        setStep(1);
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {}
      },
    }),
    [step, draft]
  );

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}
