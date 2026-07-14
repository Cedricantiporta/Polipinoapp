import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";
import { ShieldIcon, TruckIcon, HeartIcon, BoxIcon, MapPinIcon } from "./icons";

const badges = [
  { icon: ShieldIcon, title: "Safe & Secure", desc: "Your package is in good hands" },
  { icon: TruckIcon, title: "Door-to-Door", desc: "Convenient delivery to your loved ones" },
  { icon: HeartIcon, title: "Built on Trust", desc: "Years of service, millions of smiles" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-clean">
      <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
        <Image
          src="/Hero_image.jpg"
          alt="A Poli Pino Pinas balikbayan box, ready to ship"
          fill
          sizes="(min-width: 1024px) 52vw, 0px"
          className="object-cover"
          priority
          style={{
            maskImage: "linear-gradient(to right, transparent, black 30%)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-y-12 px-6 py-14 lg:grid-cols-[560px_1fr] lg:gap-x-10 lg:px-12 lg:py-16">
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
                className="inline-flex items-center gap-2 rounded-lg bg-sage px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-forest-dark"
              >
                <BoxIcon className="h-5 w-5" strokeWidth={1.75} />
                Send a Padala
              </Link>
              <Link
                href="/track"
                className="inline-flex items-center gap-2 rounded-lg border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-moss hover:text-moss-text"
              >
                <MapPinIcon className="h-5 w-5" strokeWidth={1.75} />
                Track a Padala
              </Link>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 grid grid-cols-1 divide-y divide-rule sm:grid-cols-3 sm:gap-x-6 sm:divide-x sm:divide-y-0">
              {badges.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 py-4 sm:py-0 sm:pl-6 sm:first:pl-0">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-moss-text" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{desc}</p>
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
