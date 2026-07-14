import { WizardProvider } from "@/lib/wizard-context";
import { WizardShell } from "@/components/wizard/wizard-shell";

export default function DropOffPage() {
  return (
    <WizardProvider>
      <WizardShell />
    </WizardProvider>
  );
}
