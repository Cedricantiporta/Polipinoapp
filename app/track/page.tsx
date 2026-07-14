import Link from "next/link";
import { UtilityBar } from "@/components/marketing/utility-bar";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { TrackForm } from "./track-form";

export default function TrackPage() {
  return (
    <div className="flex flex-1 flex-col bg-clean">
      <UtilityBar />
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-lg px-4 py-20 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss">
            Track a Padala
          </p>
          <h1 className="mt-3 font-serif text-4xl italic text-ink">
            Where&apos;s your box?
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Enter the reference number from your shipping label. Live status tracking
            is coming soon — for now we&apos;ll get you an answer directly.
          </p>
          <div className="mt-8">
            <TrackForm />
          </div>
          <p className="mt-8 text-xs text-ink-soft">
            Sent a package and lost your label?{" "}
            <a href="mailto:hello@polipinopinas.com" className="font-semibold text-moss">
              Email us
            </a>{" "}
            with your name and drop-off date.
          </p>
          <Link
            href="/dropoff"
            className="mt-10 inline-block text-xs font-semibold uppercase tracking-wide text-ink-soft hover:text-moss"
          >
            ← Send a new package instead
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
