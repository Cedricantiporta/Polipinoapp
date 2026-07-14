"use client";

import Link from "next/link";
import Image from "next/image";
import { useWizard } from "@/lib/wizard-context";
import { Stepper } from "./stepper";
import { Step1Consignee } from "./step-1-consignee";
import { Step2Boxes } from "./step-2-boxes";
import { Step3Terms } from "./step-3-terms";
import { Step4SenderId } from "./step-4-sender-id";
import { Step5Review } from "./step-5-review";

export function WizardShell() {
  const { step } = useWizard();

  return (
    <div className="flex min-h-screen flex-col bg-clean">
      <header className="bg-moss px-4 pb-6 pt-5 sm:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="" width={28} height={28} className="invert" />
            <h1 className="font-serif text-lg text-white sm:text-xl">
              Drop Off Package
            </h1>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wide text-white/80 hover:text-white"
          >
            Cancel
          </Link>
        </div>
        <div className="mx-auto mt-5 max-w-2xl">
          <Stepper step={step} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <div className="rounded-2xl bg-surface p-5 shadow-sm sm:p-8">
          {step === 1 && <Step1Consignee />}
          {step === 2 && <Step2Boxes />}
          {step === 3 && <Step3Terms />}
          {step === 4 && <Step4SenderId />}
          {step === 5 && <Step5Review />}
        </div>
      </main>
    </div>
  );
}
