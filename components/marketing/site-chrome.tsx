import { UtilityBar } from "./utility-bar";
import { SiteHeader } from "./site-header";

export function SiteChrome() {
  return (
    <div className="sticky top-0 z-40">
      <UtilityBar />
      <SiteHeader />
    </div>
  );
}
