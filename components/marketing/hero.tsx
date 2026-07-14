import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";
import { ShieldIcon, TruckIcon, HeartIcon } from "./icons";

const badges = [
  { icon: ShieldIcon, title: "Safe & Secure", desc: "Your package is in good hands" },
  { icon: TruckIcon, title: "Door-to-Branch", desc: "Convenient drop-off, done online" },
  { icon: HeartIcon, title: "Built on Trust", desc: "Packed and sent with care" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-clean">
      <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <Image
          src="/hero-box.png"
          alt="A Poli Pino Pinas balikbayan box, ready to ship"
          fill
          sizes="(min-width: 1024px) 58vw, 0px"
          className="object-cover"
          priority
          style={{
            maskImage: "linear-gradient(to right, transparent, black 30%)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-y-12 px-6 py-16 lg:grid-cols-[440px_1fr] lg:gap-x-10 lg:px-12 lg:py-20">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss-text">
              We Deliver What Matters
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 text-balance font-serif text-6xl font-bold leading-[1.02] text-ink sm:text-7xl">
              Send love
              <br />
              across borders
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-mid">
              Balikbayan boxes filled with care. Delivered safely to the people who
              matter most.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/dropoff"
                className="rounded-full bg-sage px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-moss-text"
              >
                Send a Padala
              </Link>
              <Link
                href="/track"
                className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-moss hover:text-moss-text"
              >
                Track a Padala
              </Link>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 grid grid-cols-1 divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface shadow-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {badges.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-4">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-moss-text" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <p className="text-xs text-ink-soft">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div aria-hidden className="hidden lg:block" />
      </div>
    </section>
  );
}
