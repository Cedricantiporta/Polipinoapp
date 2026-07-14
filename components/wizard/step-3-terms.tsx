"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { termsSchema, type Terms } from "@/lib/schema";
import { useWizard } from "@/lib/wizard-context";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { prohibitedItems } from "@/lib/prohibited-items";

export function Step3Terms() {
  const { draft, setTerms, goNext, goBack } = useWizard();
  const sigRef = useRef<SignatureCanvas>(null);
  const [agreed, setAgreed] = useState(!!draft.terms?.agreed);
  const [hasSignature, setHasSignature] = useState(!!draft.terms?.signatureDataUrl);
  const [showTerms, setShowTerms] = useState(false);
  const [showProhibited, setShowProhibited] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClearSignature = () => {
    sigRef.current?.clear();
    setHasSignature(false);
  };

  const onSubmit = () => {
    const signatureDataUrl =
      sigRef.current && !sigRef.current.isEmpty()
        ? sigRef.current.getTrimmedCanvas().toDataURL("image/png")
        : draft.terms?.signatureDataUrl && hasSignature
          ? draft.terms.signatureDataUrl
          : "";

    const candidate: Terms = { signatureDataUrl, agreed: agreed as true };
    const parsed = termsSchema.safeParse(candidate);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please complete this step.");
      return;
    }
    setError(null);
    setTerms(parsed.data);
    goNext();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-moss-text">
          Step 3
        </p>
        <h2 className="mt-1 font-serif text-2xl text-ink">Terms & Signature</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Please review the terms and prohibited items list, then sign below.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
            Signature
          </p>
          <button
            type="button"
            onClick={onClearSignature}
            className="text-xs font-semibold uppercase tracking-wide text-red-600 hover:text-red-700"
          >
            Clear
          </button>
        </div>
        <div className="overflow-hidden rounded-xl border border-rule bg-green-mist/40">
          <SignatureCanvas
            ref={sigRef}
            penColor="#2E332B"
            canvasProps={{ className: "h-48 w-full" }}
            onEnd={() => setHasSignature(true)}
          />
        </div>
      </div>

      <p className="text-sm text-ink-soft">
        By signing this form, I authorize <strong className="text-ink">Poli Pino Pinas</strong>{" "}
        to pick up, process, and deliver my balikbayan box based on the information I
        provided.
      </p>

      <label className="flex items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-moss"
        />
        <span>
          I confirm that I have read, understood, and agreed to all applicable
          policies, including the{" "}
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="font-semibold text-moss-text underline underline-offset-2"
          >
            Terms and Conditions
          </button>{" "}
          and the{" "}
          <button
            type="button"
            onClick={() => setShowProhibited(true)}
            className="font-semibold text-moss-text underline underline-offset-2"
          >
            Prohibited Items List
          </button>
          .
        </span>
      </label>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}

      <div className="flex justify-between pt-2">
        <Button type="button" variant="ghost" onClick={goBack}>
          Back
        </Button>
        <Button type="button" onClick={onSubmit}>
          Next
        </Button>
      </div>

      <Modal open={showTerms} onClose={() => setShowTerms(false)} title="Terms and Conditions">
        <div className="flex flex-col gap-3">
          <p>
            <strong className="text-ink">1. Responsibility.</strong> The sender is the
            rightful owner of the shipment and is responsible for accurately declaring
            its contents and value.
          </p>
          <p>
            <strong className="text-ink">2. Packing.</strong> The sender is responsible
            for properly packing and sealing the box. Poli Pino Pinas is not liable for
            damage to improperly packed items.
          </p>
          <p>
            <strong className="text-ink">3. Prohibited contents.</strong> The sender
            certifies that the shipment contains none of the items on the Prohibited
            Items List, and that all contents comply with Philippine and destination
            country regulations.
          </p>
          <p>
            <strong className="text-ink">4. Inspection.</strong> Shipments may be
            opened and inspected by customs or carrier partners as required by law.
          </p>
          <p>
            <strong className="text-ink">5. Delays.</strong> Delivery timelines are
            estimates. Poli Pino Pinas is not liable for delays caused by customs
            processing, weather, or carrier disruptions outside its control.
          </p>
          <p>
            <strong className="text-ink">6. Signature.</strong> By signing above, the
            sender agrees to all of the above and authorizes Poli Pino Pinas to process
            this shipment.
          </p>
        </div>
      </Modal>

      <Modal open={showProhibited} onClose={() => setShowProhibited(false)} title="Prohibited Items">
        <ul className="flex flex-col gap-3">
          {prohibitedItems.map((item) => (
            <li key={item.title}>
              <p className="font-semibold text-ink">{item.title}</p>
              <p className="text-xs text-ink-soft">{item.note}</p>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
