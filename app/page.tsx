import { SiteChrome } from "@/components/marketing/site-chrome";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-clean">
      <SiteChrome />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
      </main>
      <SiteFooter />
    </div>
  );
}
