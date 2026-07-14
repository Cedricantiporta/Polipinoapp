import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-clean px-6 py-20 text-center">
      <Image src="/logo.svg" alt="Poli Pino Pinas" width={96} height={96} priority />
      <h1 className="mt-6 font-serif text-3xl tracking-wide text-ink sm:text-4xl">
        POLI PINO PINAS
      </h1>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
        Filipino Cultural Store
      </p>

      <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-soft">
        Sending a balikbayan box? Fill out your drop-off forms online and generate
        your shipping label before you arrive.
      </p>

      <Link
        href="/dropoff"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-moss px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-moss/90"
      >
        Start Drop Off
      </Link>
    </div>
  );
}
