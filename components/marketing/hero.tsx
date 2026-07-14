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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss-text">
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
                className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-moss hover:text-moss-text"
              >
                Track a Padala
              </Link>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-12 grid grid-cols-1 gap-5 border-t border-rule pt-6 sm:grid-cols-3">
              {badges.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
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

        <Reveal delay={200} className="relative hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-home shadow-xl">
            <Image
              src="/hero-box.png"
              alt="A Poli Pino Pinas balikbayan box, ready to ship"
              fill
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-8 bottom-8 rounded-2xl bg-surface/90 p-4 shadow-lg backdrop-blur">
              <p className="font-serif text-sm italic text-ink">
                &ldquo;We connect families. We deliver what matters most.&rdquo;
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
