"use client";

import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
  type FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { boxesSchema, conditionOptions, type Boxes } from "@/lib/schema";
import { useWizard } from "@/lib/wizard-context";
import { Button } from "@/components/ui/button";
import { inputClass } from "@/components/ui/field";

const commonItems = [
  "Assorted Clothing",
  "Assorted Groceries",
  "Bags & Gifts",
  "Canned Goods",
  "Chocolates",
  "Toiletries",
  "Shoes",
  "Toys",
];

function BoxCard({
  boxIndex,
  onRemoveBox,
  canRemoveBox,
  errors,
}: {
  boxIndex: number;
  onRemoveBox: () => void;
  canRemoveBox: boolean;
  errors: FieldErrors<Boxes>;
}) {
  const { register, control } = useFormContext<Boxes>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `boxes.${boxIndex}.items`,
  });

  return (
    <div className="rounded-xl border border-rule p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Box #{boxIndex + 1}</p>
        {canRemoveBox ? (
          <Button type="button" variant="danger" className="px-0 py-0" onClick={onRemoveBox}>
            Remove Box
          </Button>
        ) : null}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-ink-soft">
              <th className="pb-2 font-semibold">Item</th>
              <th className="pb-2 font-semibold">Qty</th>
              <th className="pb-2 font-semibold">Price</th>
              <th className="pb-2 font-semibold">Condition</th>
              <th className="pb-2" />
            </tr>
          </thead>
          <tbody>
            {fields.map((field, itemIndex) => {
              const itemErr = errors?.boxes?.[boxIndex]?.items?.[itemIndex];
              return (
                <tr key={field.id} className="border-t border-rule/60">
                  <td className="py-2 pr-2">
                    <input
                      list="common-items"
                      className={inputClass(!!itemErr?.name)}
                      {...register(`boxes.${boxIndex}.items.${itemIndex}.name` as const)}
                    />
                  </td>
                  <td className="py-2 pr-2 w-20">
                    <input
                      type="number"
                      min={1}
                      className={inputClass(!!itemErr?.qty)}
                      {...register(`boxes.${boxIndex}.items.${itemIndex}.qty` as const, {
                        valueAsNumber: true,
                      })}
                    />
                  </td>
                  <td className="py-2 pr-2 w-28">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      className={inputClass(!!itemErr?.price)}
                      {...register(`boxes.${boxIndex}.items.${itemIndex}.price` as const, {
                        valueAsNumber: true,
                      })}
                    />
                  </td>
                  <td className="py-2 pr-2 w-28">
                    <select
                      className={inputClass()}
                      {...register(`boxes.${boxIndex}.items.${itemIndex}.condition` as const)}
                    >
                      {conditionOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => remove(itemIndex)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {errors?.boxes?.[boxIndex]?.items?.message ? (
        <p className="mt-2 text-xs text-red-600">
          {errors.boxes[boxIndex].items.message}
        </p>
      ) : null}

      <Button
        type="button"
        variant="secondary"
        className="mt-4"
        onClick={() => append({ name: "", qty: 1, price: 0, condition: "New" })}
      >
        + Add Other Item
      </Button>
    </div>
  );
}

export function Step2Boxes() {
  const { draft, setBoxes, goNext, goBack } = useWizard();
  const methods = useForm<Boxes>({
    resolver: zodResolver(boxesSchema),
    defaultValues: { boxes: draft.boxes },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({ control, name: "boxes" });

  const onSubmit = (values: Boxes) => {
    setBoxes(values.boxes);
    goNext();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <datalist id="common-items">
          {commonItems.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-moss-text">
            Step 2
          </p>
          <h2 className="mt-1 font-serif text-2xl text-ink">Box Contents</h2>
          <p className="mt-2 text-sm text-ink-soft">
            List everything in each box with quantity, declared value, and condition.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {fields.map((field, boxIndex) => (
            <BoxCard
              key={field.id}
              boxIndex={boxIndex}
              canRemoveBox={fields.length > 1}
              onRemoveBox={() => remove(boxIndex)}
              errors={errors}
            />
          ))}
        </div>

        {errors.boxes?.message ? (
          <p className="text-xs text-red-600">{errors.boxes.message}</p>
        ) : null}

        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ items: [] })}
        >
          + Add Another Box
        </Button>

        <div className="flex justify-between pt-2">
          <Button type="button" variant="ghost" onClick={goBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
}
