import { Reveal } from "./reveal";
import { ClipboardIcon, BoxIcon, TagIcon, TruckIcon } from "./icons";

const steps = [
  {
    icon: ClipboardIcon,
    title: "Fill in Details",
    desc: "Recipient and sender information, online",
  },
  {
    icon: BoxIcon,
    title: "Declare Your Items",
    desc: "List what's in your box, box by box",
  },
  {
    icon: TagIcon,
    title: "Generate Your Label",
    desc: "Sign digitally, get a reference number and QR label",
  },
  {
    icon: TruckIcon,
    title: "Drop Off",
    desc: "Bring your box and label to any branch",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-green-mist/50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss-text">
            How It Works
          </p>
          <h2 className="mt-3 max-w-lg text-balance font-serif text-4xl font-medium italic text-ink">
            Sending a package is easy
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="relative flex flex-col items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-moss-text shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                    Step {i + 1}
                  </p>
                  <p className="mt-1 font-serif text-lg text-ink">{title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
