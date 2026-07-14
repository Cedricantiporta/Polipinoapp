import { SiteChrome } from "@/components/marketing/site-chrome";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col bg-clean">
      <SiteChrome />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-4 py-16 text-sm leading-relaxed text-ink-soft sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss">
            Legal
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium italic text-ink">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-ink-soft">Draft — last reviewed manually, not by legal counsel.</p>

          <div className="mt-8 flex flex-col gap-6">
            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">What we collect</h2>
              <p>
                When you fill out the drop-off form, we collect: recipient name,
                phone number, and delivery address; your (the sender&apos;s) name,
                phone number, ID type, ID number, ID expiry date, and a photo of
                your ID; a description of your box contents and declared value; and
                your signature.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">
                Where it goes — and where it doesn&apos;t
              </h2>
              <p>
                Right now, this site does not have a server-side database. Your
                information is used entirely in your browser to generate a PDF
                shipping label, which is downloaded to your device. We do not
                receive, store, or have access to a copy of what you entered unless
                you separately email or hand it to us.
              </p>
              <p className="mt-2">
                This will change once accounts and live shipment tracking are
                connected — at that point this policy will be updated to describe
                what we store, for how long, and who it&apos;s shared with (for
                example, a shipping carrier for delivery purposes).
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">
                Cookies and local storage
              </h2>
              <p>
                We use your browser&apos;s local storage to save your in-progress
                drop-off form, so a refresh doesn&apos;t erase your work. This is
                used only for that purpose — not analytics, tracking, or
                advertising — and stays on your device.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">Your rights</h2>
              <p>
                Since we don&apos;t currently store your data on our servers, most
                data-subject rights (access, correction, deletion) don&apos;t
                apply yet in a technical sense — there&apos;s nothing on our end to
                access or delete. Once accounts and a database are introduced,
                this section will describe how to exercise your rights to access,
                correct, delete, or export your data.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-lg text-ink">Contact</h2>
              <p>
                Questions about this policy:{" "}
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
