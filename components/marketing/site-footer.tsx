import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, TiktokIcon, MailIcon } from "./icons";
import { NewsletterForm } from "./newsletter-form";

const socials = [
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: TiktokIcon, label: "TikTok", href: "#" },
  { icon: MailIcon, label: "Email", href: "mailto:hello@polipinopinas.com" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-clean">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo-sage.svg" alt="" width={32} height={32} />
              <span className="font-serif text-base tracking-wide text-ink">
                POLI PINO PINAS
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              We connect families. We deliver what matters most.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink-soft transition-colors hover:border-moss hover:text-moss-text"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              Explore
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-ink">
              <li>
                <Link href="/dropoff" className="hover:text-moss-text">
                  Send a Package
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-moss-text">
                  Track a Package
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-moss-text">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              Support
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-ink">
              <li>
                <a href="mailto:hello@polipinopinas.com" className="hover:text-moss-text">
                  hello@polipinopinas.com
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-moss-text">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/tos" className="hover:text-moss-text">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              Stay Updated
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              Get the latest updates and news straight to your inbox.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-rule pt-6 text-xs text-ink-soft">
          <p>© {new Date().getFullYear()} Poli Pino Pinas. Filipino Cultural Store.</p>
        </div>
      </div>
    </footer>
  );
}
