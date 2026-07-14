"use client";

import Link from "next/link";
import { useWizard } from "@/lib/wizard-context";
import { SiteChrome } from "@/components/marketing/site-chrome";
import { SiteFooter } from "@/components/marketing/site-footer";
import { ShieldIcon } from "@/components/marketing/icons";
import { Stepper } from "./stepper";
import { Step1Consignee } from "./step-1-consignee";
import { Step2Boxes } from "./step-2-boxes";
import { Step3Terms } from "./step-3-terms";
import { Step4SenderId } from "./step-4-sender-id";
import { Step5Review } from "./step-5-review";

export function WizardShell() {
  const { step } = useWizard();

  return (
    <div className="flex flex-1 flex-col bg-clean">
      <SiteChrome />
      <main className="flex-1">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[340px_1fr] lg:gap-16 lg:px-12 lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss-text">
              Send a Package
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium italic text-ink">
              Let&apos;s get your padala moving
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-mid">
              Fill out the form on the right with the recipient&apos;s details,
              what&apos;s in the box, and how you&apos;ll drop it off. Your progress
              is saved automatically, so it&apos;s safe to come back and finish
              later.
            </p>

            <div className="mt-10">
              <Stepper step={step} />
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-lg border border-rule bg-surface p-4">
              <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-moss-text" />
              <p className="text-xs leading-relaxed text-ink-soft">
                Safe &amp; secure — your details are only used to prepare your
                shipment and label.
              </p>
            </div>

            <Link
              href="/"
              className="mt-6 inline-block text-xs font-semibold uppercase tracking-wide text-ink-soft hover:text-ink"
            >
              Cancel and return home
            </Link>
          </div>

          <div className="rounded-2xl bg-surface p-5 shadow-sm sm:p-8">
            {step === 1 && <Step1Consignee />}
            {step === 2 && <Step2Boxes />}
            {step === 3 && <Step3Terms />}
            {step === 4 && <Step4SenderId />}
            {step === 5 && <Step5Review />}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
