import { SiteChrome } from "@/components/marketing/site-chrome";
import { SiteFooter } from "@/components/marketing/site-footer";
import { prohibitedItems } from "@/lib/prohibited-items";

export default function TermsPage() {
  return (
    <div className="flex flex-1 flex-col bg-clean">
      <SiteChrome />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-4 py-16 text-sm leading-relaxed text-ink-soft sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss">
            Legal
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium italic text-ink">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-ink-soft">Draft — last reviewed manually, not by legal counsel.</p>

          <div className="mt-8 flex flex-col gap-6">
            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">1. The service</h2>
              <p>
                Poli Pino Pinas lets you fill out balikbayan box drop-off forms
                online and generate a shipping label. Bringing your packed box and
                that label to a branch is currently required — this site does not
                yet handle pickup, payment, or live delivery tracking.
              </p>
            </section>
            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">2. Your responsibility</h2>
              <p>
                You are responsible for accurately declaring your box&apos;s
                contents and value, for packing and sealing it properly, and for
                ensuring nothing in it is prohibited (see the list below).
              </p>
            </section>
            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">3. Prohibited items</h2>
              <ul className="mt-2 flex flex-col gap-2">
                {prohibitedItems.map((item) => (
                  <li key={item.title}>
                    <span className="font-semibold text-ink">{item.title}</span>
                    {" — "}
                    <span>{item.note}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">4. Inspection & delays</h2>
              <p>
                Shipments may be opened and inspected by customs or carrier
                partners as required by law. Delivery timelines are estimates;
                we&apos;re not liable for delays from customs processing, weather,
                or carrier disruptions outside our control.
              </p>
            </section>
            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">5. Changes</h2>
              <p>
                We may update these terms as the service grows (for example, once
                online payment or live tracking is added). Continued use after a
                change means you accept the updated terms.
              </p>
            </section>
            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">6. Contact</h2>
              <p>
                Questions:{" "}
                <a href="mailto:hello@polipinopinas.com" className="font-semibold text-moss">
                  hello@polipinopinas.com
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
