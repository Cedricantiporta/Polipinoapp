import Link from "next/link";
import { SiteChrome } from "@/components/marketing/site-chrome";
import { SiteFooter } from "@/components/marketing/site-footer";
import { TrackForm } from "./track-form";

export default function TrackPage() {
  return (
    <div className="flex flex-1 flex-col bg-clean">
      <SiteChrome />
      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss-text">
            Track a Padala
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium italic text-ink">
            Where&apos;s your box?
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Enter the reference number from your shipping label.
          </p>
          <div className="mt-8">
            <TrackForm />
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-rule bg-green-mist/30 p-4 text-left text-sm text-ink-soft">
            <Link href="/login" className="font-semibold text-moss-text">
              Log in
            </Link>{" "}
            to see all your shipments here automatically — no reference number
            needed.
          </div>

          <p className="mt-8 text-xs text-ink-soft">
            Sent a package and lost your label?{" "}
            <a href="mailto:hello@polipinopinas.com" className="font-semibold text-moss-text">
              Email us
            </a>{" "}
            with your name and drop-off date.
          </p>
          <Link
            href="/dropoff"
            className="mt-10 inline-block text-xs font-semibold uppercase tracking-wide text-ink-soft hover:text-moss-text"
          >
            ← Send a new package instead
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
