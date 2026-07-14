import Link from "next/link";
import { SiteChrome } from "@/components/marketing/site-chrome";
import { SiteFooter } from "@/components/marketing/site-footer";
import { BoxIcon, TruckIcon, MapPinIcon } from "@/components/marketing/icons";

const sampleShipments = [
  { ref: "PPP-2607-000123", status: "In Transit", eta: "Jul 24, 2026" },
  { ref: "PPP-2607-000098", status: "Out for Delivery", eta: "Jul 22, 2026" },
  { ref: "PPP-2506-000045", status: "Delivered", eta: "Delivered Jun 18, 2026" },
];

const menuItems = [
  "Address Book",
  "Payment Methods",
  "Notification Settings",
  "Help Center",
];

export default function AccountPage() {
  return (
    <div className="flex flex-1 flex-col bg-clean">
      <SiteChrome />
      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-4 py-14 sm:px-8">
          <div className="rounded-xl border border-dashed border-rule bg-green-mist/30 p-3 text-xs text-ink-soft">
            Draft preview — this account and its shipments are sample data, not
            connected to a real login.
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-lg font-semibold text-white">
              J
            </div>
            <div>
              <p className="font-serif text-xl text-ink">Jenina</p>
              <p className="text-sm text-ink-soft">jenina@email.com</p>
            </div>
          </div>

          <p className="mt-10 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
            My Shipments
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {sampleShipments.map((s) => (
              <div
                key={s.ref}
                className="flex items-center justify-between rounded-xl border border-rule bg-surface p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moss/15 text-moss">
                    {s.status === "Delivered" ? (
                      <BoxIcon className="h-5 w-5" />
                    ) : (
                      <TruckIcon className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{s.ref}</p>
                    <p className="text-xs text-ink-soft">{s.eta}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    s.status === "Delivered"
                      ? "bg-moss/15 text-moss"
                      : "bg-gold/15 text-gold"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
            Settings
          </p>
          <div className="mt-3 flex flex-col divide-y divide-rule overflow-hidden rounded-xl border border-rule bg-surface">
            {menuItems.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between px-4 py-3.5 text-sm text-ink-soft"
              >
                <span className="flex items-center gap-3">
                  <MapPinIcon className="h-4 w-4 text-ink-soft" />
                  {item}
                </span>
                <span className="text-ink-soft/50">→</span>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="mt-10 inline-block text-xs font-semibold uppercase tracking-wide text-ink-soft hover:text-moss"
          >
            Log Out
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
