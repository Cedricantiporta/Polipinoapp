import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";
import { ShieldIcon, TruckIcon, HeartIcon } from "./icons";

const badges = [
  { icon: ShieldIcon, title: "Safe & Secure", desc: "Your box is in good hands" },
  { icon: TruckIcon, title: "Door-to-Branch", desc: "Convenient drop-off, done online" },
  { icon: HeartIcon, title: "Built on Trust", desc: "Packed and sent with care" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss">
              We Deliver What Matters
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 text-balance font-serif text-5xl font-medium italic leading-[1.05] text-ink sm:text-6xl lg:text-[4rem]">
              Send love
              <br />
              across borders
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Balikbayan boxes filled with care. Fill out your forms and generate your
              shipping label online — before you even leave the house.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/dropoff"
                className="rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-forest-dark"
              >
                Send a Padala
              </Link>
              <Link
                href="/track"
                className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-moss hover:text-moss"
              >
                Track a Padala
              </Link>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-12 grid grid-cols-1 gap-5 border-t border-rule pt-6 sm:grid-cols-3">
              {badges.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-moss" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <p className="text-xs text-ink-soft">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-home via-clean to-sky/60">
            <Image
              src="/logo.svg"
              alt=""
              fill
              className="scale-[2.2] object-contain opacity-[0.14] mix-blend-multiply"
              style={{ transform: "scale(2.2) rotate(-6deg)" }}
            />
            <div className="absolute inset-x-8 bottom-8 rounded-2xl bg-surface/90 p-4 shadow-lg backdrop-blur">
              <p className="font-serif text-sm italic text-ink">
                &ldquo;We connect families. We deliver what matters most.&rdquo;
              </p>
            </div>
          </div>
          <div className="absolute -left-6 top-8 hidden rounded-2xl bg-surface px-4 py-3 shadow-lg sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
              Reference No.
            </p>
            <p className="font-serif text-lg text-ink">PPP-XXXXXX</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
