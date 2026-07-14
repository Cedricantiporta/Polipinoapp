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
    <section id="how-it-works" className="bg-green-mist/50 py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-moss-text">
            How It Works
          </p>
          <h2 className="mt-3 max-w-lg text-balance font-serif text-4xl font-bold text-ink sm:text-5xl">
            Sending a package is easy
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-[12.5%] right-[12.5%] top-12 hidden border-t border-dashed border-ink/25 lg:block" />
          <div className="relative grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface text-moss-text shadow-md ring-8 ring-green-mist/50">
                    <Icon className="h-9 w-9" strokeWidth={1.25} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                      Step {i + 1}
                    </p>
                    <p className="mt-1 font-serif text-lg font-semibold text-ink">{title}</p>
                    <p className="mt-1 max-w-[16rem] text-sm text-ink-soft">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
