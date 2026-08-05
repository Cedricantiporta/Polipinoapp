"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import QRCode from "qrcode";
import { useWizard } from "@/lib/wizard-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/lib/pdf/label";
import {
  boxSchema,
  consigneeSchema,
  senderIdSchema,
  termsSchema,
  type DropOffSubmission,
} from "@/lib/schema";

const TRACKING_API_URL =
  process.env.NEXT_PUBLIC_TRACKING_API_URL ?? "http://localhost:3001";

function generateReferenceNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PPP-${stamp}-${rand}`;
}

export function Step5Review() {
  const { draft, goBack, resetDraft } = useWizard();
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingWarning, setTrackingWarning] = useState<string | null>(null);

  const { consignee, boxes, terms, sender } = draft;
  // Re-validate against the current schemas, not just truthiness -- a draft
  // saved in localStorage before a required field was added (e.g. sender
  // email) would otherwise look "ready" while missing data the API needs.
  const ready = Boolean(
    consignee &&
      consigneeSchema.safeParse(consignee).success &&
      terms &&
      termsSchema.safeParse(terms).success &&
      sender &&
      senderIdSchema.safeParse(sender).success &&
      boxes.length > 0 &&
      boxes.every((box) => boxSchema.safeParse(box).success)
  );

  const grandTotal = boxes.reduce(
    (sum, box) => sum + box.items.reduce((s, i) => s + i.qty * i.price, 0),
    0
  );

  const onGenerate = async () => {
    if (!consignee || !terms || !sender) {
      setError("Please complete all previous steps first.");
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const referenceNumber = generateReferenceNumber();
      const qrDataUrl = await QRCode.toDataURL(referenceNumber, { margin: 1 });
      const submission: DropOffSubmission = {
        referenceNumber,
        consignee,
        boxes,
        terms,
        sender,
        submittedAt: new Date().toISOString(),
      };
      const blob = await pdf(
        <Label submission={submission} qrDataUrl={qrDataUrl} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${referenceNumber}-balikbayan-label.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      try {
        const res = await fetch(`${TRACKING_API_URL}/api/shipments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referenceNumber,
            recipientName: `${consignee.firstName} ${consignee.lastName}`,
            senderEmail: sender.senderEmail,
          }),
        });
        if (!res.ok) throw new Error();
      } catch {
        setTrackingWarning(
          "Your label was created, but we couldn't register it with our tracking system. Please contact us with your reference number to make sure your shipment is tracked."
        );
      }

      setDone(true);
    } catch (e) {
      setError("Something went wrong generating your label. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-moss/15 text-2xl text-moss-text">
          ✓
        </div>
        <h2 className="font-serif text-2xl text-ink">Label Generated</h2>
        <p className="max-w-sm text-sm text-ink-soft">
          Your shipping label has been downloaded. Bring a printed or digital copy of
          it when you drop off your box.
        </p>
        {trackingWarning ? (
          <p className="max-w-sm text-xs text-red-600">{trackingWarning}</p>
        ) : null}
        <Button onClick={resetDraft}>Send New Padala</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-moss-text">
          Step 5
        </p>
        <h2 className="mt-1 font-serif text-2xl text-ink">Review & Generate Label</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Double check everything below, then generate your shipping label.
        </p>
      </div>

      {!ready ? (
        <p className="text-sm text-red-600">
          Some earlier steps are incomplete — go back and finish them first.
        </p>
      ) : (
        <div className="flex flex-col gap-5 text-sm">
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              Consignee
            </p>
            <p className="mt-1 text-ink">
              {consignee!.firstName} {consignee!.lastName} — {consignee!.primaryPhone}
            </p>
            <p className="text-ink-soft">
              {consignee!.streetAddress}, {consignee!.barangayName}, {consignee!.cityName},{" "}
              {consignee!.provinceName}, {consignee!.zipCode}
            </p>
          </section>

          <section>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              Sender
            </p>
            <p className="mt-1 text-ink">
              {sender!.senderFirstName} {sender!.senderLastName} — {sender!.senderPhone}
            </p>
            <p className="text-ink-soft">
              {sender!.idType}: {sender!.idNumber}
            </p>
          </section>

          <section>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              Boxes
            </p>
            <div className="mt-1 flex flex-col gap-2">
              {boxes.map((box, i) => (
                <div key={i} className="rounded-lg border border-rule p-3">
                  <p className="font-semibold text-ink">Box #{i + 1}</p>
                  <ul className="mt-1 text-ink-soft">
                    {box.items.map((item, j) => (
                      <li key={j}>
                        {item.qty}× {item.name} ({item.condition}) — PHP{" "}
                        {(item.qty * item.price).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-2 text-right font-semibold text-ink">
              Total declared value: PHP {grandTotal.toFixed(2)}
            </p>
          </section>
        </div>
      )}

      {error ? <p className="text-xs text-red-600">{error}</p> : null}

      <div className="flex justify-between pt-2">
        <Button type="button" variant="ghost" onClick={goBack} disabled={generating}>
          Back
        </Button>
        <Button type="button" onClick={onGenerate} disabled={!ready || generating}>
          {generating ? "Generating..." : "Generate Label"}
        </Button>
      </div>
    </div>
  );
}
