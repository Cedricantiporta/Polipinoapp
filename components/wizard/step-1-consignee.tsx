"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  regions as fetchRegions,
  provinces as fetchProvinces,
  cities as fetchCities,
  barangays as fetchBarangays,
} from "select-philippines-address";
import { consigneeSchema, type Consignee } from "@/lib/schema";
import { useWizard } from "@/lib/wizard-context";
import { Field, inputClass } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

interface Loc {
  code: string;
  name: string;
}

export function Step1Consignee() {
  const { draft, setConsignee, goNext } = useWizard();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Consignee>({
    resolver: zodResolver(consigneeSchema),
    defaultValues: draft.consignee,
  });

  const regionCode = watch("regionCode");
  const provinceCode = watch("provinceCode");
  const cityCode = watch("cityCode");

  const [regionList, setRegionList] = useState<Loc[]>([]);
  const [provinceList, setProvinceList] = useState<Loc[]>([]);
  const [cityList, setCityList] = useState<Loc[]>([]);
  const [barangayList, setBarangayList] = useState<Loc[]>([]);

  useEffect(() => {
    fetchRegions().then((data) => {
      if (Array.isArray(data)) {
        setRegionList(data.map((r) => ({ code: r.region_code, name: r.region_name })));
      }
    });
  }, []);

  useEffect(() => {
    if (!regionCode) {
      setProvinceList([]);
      return;
    }
    fetchProvinces(regionCode).then((data) => {
      if (Array.isArray(data)) {
        setProvinceList(
          data.map((p) => ({ code: p.province_code, name: p.province_name }))
        );
      }
    });
  }, [regionCode]);

  useEffect(() => {
    if (!provinceCode) {
      setCityList([]);
      return;
    }
    fetchCities(provinceCode).then((data) => {
      if (Array.isArray(data)) {
        setCityList(data.map((c) => ({ code: c.city_code, name: c.city_name })));
      }
    });
  }, [provinceCode]);

  useEffect(() => {
    if (!cityCode) {
      setBarangayList([]);
      return;
    }
    fetchBarangays(cityCode).then((data) => {
      if (Array.isArray(data)) {
        setBarangayList(
          data.map((b) => ({ code: b.brgy_code, name: b.brgy_name }))
        );
      }
    });
  }, [cityCode]);

  const onSubmit = (values: Consignee) => {
    setConsignee(values);
    goNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-moss-text">
          Step 1
        </p>
        <h2 className="mt-1 font-serif text-2xl text-ink">Consignee / Recipient</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Provide the full name, contact number, and complete delivery address of the
          person who will receive the package.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="First Name" htmlFor="firstName" error={errors.firstName?.message}>
          <input id="firstName" className={inputClass(!!errors.firstName)} {...register("firstName")} />
        </Field>
        <Field label="Last Name" htmlFor="lastName" error={errors.lastName?.message}>
          <input id="lastName" className={inputClass(!!errors.lastName)} {...register("lastName")} />
        </Field>
        <Field label="Primary Phone" htmlFor="primaryPhone" error={errors.primaryPhone?.message}>
          <input id="primaryPhone" placeholder="+63" className={inputClass(!!errors.primaryPhone)} {...register("primaryPhone")} />
        </Field>
        <Field label="Secondary Phone (optional)" htmlFor="secondaryPhone">
          <input id="secondaryPhone" placeholder="+63" className={inputClass()} {...register("secondaryPhone")} />
        </Field>
      </div>

      <div className="border-t border-rule pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
          Delivery Address
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <Field label="Street Address" htmlFor="streetAddress" error={errors.streetAddress?.message}>
            <input id="streetAddress" className={inputClass(!!errors.streetAddress)} {...register("streetAddress")} />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Region" htmlFor="regionCode" error={errors.regionCode?.message}>
              <select
                id="regionCode"
                className={inputClass(!!errors.regionCode)}
                {...register("regionCode")}
                onChange={(e) => {
                  const opt = regionList.find((r) => r.code === e.target.value);
                  setValue("regionCode", e.target.value);
                  setValue("regionName", opt?.name ?? "");
                  setValue("provinceCode", "");
                  setValue("provinceName", "");
                  setValue("cityCode", "");
                  setValue("cityName", "");
                  setValue("barangayCode", "");
                  setValue("barangayName", "");
                }}
              >
                <option value="">Select region</option>
                {regionList.map((r, i) => (
                  <option key={r.code + "-" + i} value={r.code}>
                    {r.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Province" htmlFor="provinceCode" error={errors.provinceCode?.message}>
              <select
                id="provinceCode"
                className={inputClass(!!errors.provinceCode)}
                disabled={!regionCode}
                {...register("provinceCode")}
                onChange={(e) => {
                  const opt = provinceList.find((p) => p.code === e.target.value);
                  setValue("provinceCode", e.target.value);
                  setValue("provinceName", opt?.name ?? "");
                  setValue("cityCode", "");
                  setValue("cityName", "");
                  setValue("barangayCode", "");
                  setValue("barangayName", "");
                }}
              >
                <option value="">Select province</option>
                {provinceList.map((p, i) => (
                  <option key={p.code + "-" + i} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="City / Municipality" htmlFor="cityCode" error={errors.cityCode?.message}>
              <select
                id="cityCode"
                className={inputClass(!!errors.cityCode)}
                disabled={!provinceCode}
                {...register("cityCode")}
                onChange={(e) => {
                  const opt = cityList.find((c) => c.code === e.target.value);
                  setValue("cityCode", e.target.value);
                  setValue("cityName", opt?.name ?? "");
                  setValue("barangayCode", "");
                  setValue("barangayName", "");
                }}
              >
                <option value="">Select city</option>
                {cityList.map((c, i) => (
                  <option key={c.code + "-" + i} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Barangay" htmlFor="barangayCode" error={errors.barangayCode?.message}>
              <select
                id="barangayCode"
                className={inputClass(!!errors.barangayCode)}
                disabled={!cityCode}
                {...register("barangayCode")}
                onChange={(e) => {
                  const opt = barangayList.find((b) => b.code === e.target.value);
                  setValue("barangayCode", e.target.value);
                  setValue("barangayName", opt?.name ?? "");
                }}
              >
                <option value="">Select barangay</option>
                {barangayList.map((b, i) => (
                  <option key={b.code + "-" + i} value={b.code}>
                    {b.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Zip Code" htmlFor="zipCode" error={errors.zipCode?.message}>
              <input id="zipCode" className={inputClass(!!errors.zipCode)} {...register("zipCode")} />
            </Field>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
