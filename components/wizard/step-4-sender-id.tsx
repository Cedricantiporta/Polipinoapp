"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { idTypeOptions, senderIdSchema, type SenderId } from "@/lib/schema";
import { useWizard } from "@/lib/wizard-context";
import { Field, inputClass } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function Step4SenderId() {
  const { draft, setSender, goNext, goBack } = useWizard();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SenderId>({
    resolver: zodResolver(senderIdSchema),
    defaultValues: draft.sender,
  });

  const idImageDataUrl = watch("idImageDataUrl");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 6 * 1024 * 1024) {
      setUploadError("Image is too large (max 6MB).");
      return;
    }
    setUploadError(null);
    const dataUrl = await fileToDataUrl(file);
    setValue("idImageDataUrl", dataUrl, { shouldValidate: true });
  };

  const onSubmit = (values: SenderId) => {
    setSender(values);
    goNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-moss-text">
          Step 4
        </p>
        <h2 className="mt-1 font-serif text-2xl text-ink">Sender ID Information</h2>
        <p className="mt-2 text-sm text-ink-soft">
          In compliance with customs regulations, a valid ID is required before sending
          a balikbayan box.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Sender First Name" htmlFor="senderFirstName" error={errors.senderFirstName?.message}>
          <input id="senderFirstName" className={inputClass(!!errors.senderFirstName)} {...register("senderFirstName")} />
        </Field>
        <Field label="Sender Last Name" htmlFor="senderLastName" error={errors.senderLastName?.message}>
          <input id="senderLastName" className={inputClass(!!errors.senderLastName)} {...register("senderLastName")} />
        </Field>
        <Field label="Sender Phone" htmlFor="senderPhone" error={errors.senderPhone?.message}>
          <input id="senderPhone" placeholder="+63" className={inputClass(!!errors.senderPhone)} {...register("senderPhone")} />
        </Field>
      </div>

      <div className="border-t border-rule pt-5">
        <div className="grid grid-cols-1 gap-4">
          <Field label="Sender ID Type" htmlFor="idType" error={errors.idType?.message}>
            <select id="idType" className={inputClass(!!errors.idType)} {...register("idType")}>
              <option value="">Select ID type</option>
              {idTypeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sender ID Number" htmlFor="idNumber" error={errors.idNumber?.message}>
            <input id="idNumber" className={inputClass(!!errors.idNumber)} {...register("idNumber")} />
          </Field>
          <Field label="Sender ID Exp. Date" htmlFor="idExpiryDate" error={errors.idExpiryDate?.message}>
            <input id="idExpiryDate" type="date" className={inputClass(!!errors.idExpiryDate)} {...register("idExpiryDate")} />
          </Field>
        </div>
      </div>

      <div className="border-t border-rule pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
          Upload Your ID
        </p>
        <label
          htmlFor="idImage"
          className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-rule bg-green-mist/30 px-4 py-8 text-center hover:border-moss"
        >
          {idImageDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={idImageDataUrl} alt="ID preview" className="max-h-40 rounded-md object-contain" />
          ) : (
            <span className="text-sm font-semibold text-moss-text">
              Tap to capture or upload your ID
            </span>
          )}
        </label>
        <input
          id="idImage"
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={onFileChange}
        />
        {uploadError ? <p className="mt-2 text-xs text-red-600">{uploadError}</p> : null}
        {errors.idImageDataUrl ? (
          <p className="mt-2 text-xs text-red-600">{errors.idImageDataUrl.message}</p>
        ) : null}
      </div>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="ghost" onClick={goBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
