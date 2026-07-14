import { z } from "zod";

export const conditionOptions = ["New", "Used"] as const;

export const boxItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  qty: z.number({ error: "Qty is required" }).int().min(1, "Qty must be at least 1"),
  price: z.number({ error: "Price is required" }).min(0, "Price is required"),
  condition: z.enum(conditionOptions),
});
export type BoxItem = z.infer<typeof boxItemSchema>;

export const boxSchema = z.object({
  items: z.array(boxItemSchema).min(1, "Add at least one item"),
});
export type Box = z.infer<typeof boxSchema>;

export const consigneeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  primaryPhone: z.string().min(7, "Primary phone is required"),
  secondaryPhone: z.string().optional(),
  streetAddress: z.string().min(1, "Street address is required"),
  regionCode: z.string().min(1, "Region is required"),
  regionName: z.string().min(1),
  provinceCode: z.string().min(1, "Province is required"),
  provinceName: z.string().min(1),
  cityCode: z.string().min(1, "City is required"),
  cityName: z.string().min(1),
  barangayCode: z.string().min(1, "Barangay is required"),
  barangayName: z.string().min(1),
  zipCode: z.string().min(1, "Zip code is required"),
});
export type Consignee = z.infer<typeof consigneeSchema>;

export const boxesSchema = z.object({
  boxes: z.array(boxSchema).min(1, "Add at least one box"),
});
export type Boxes = z.infer<typeof boxesSchema>;

export const termsSchema = z.object({
  signatureDataUrl: z.string().min(1, "Signature is required"),
  agreed: z.literal(true, {
    message: "You must agree to the terms to continue",
  }),
});
export type Terms = z.infer<typeof termsSchema>;

export const idTypeOptions = [
  "Philippine Passport",
  "Driver's License",
  "PhilSys National ID",
  "SSS ID",
  "UMID",
  "Postal ID",
  "Voter's ID",
] as const;

export const senderIdSchema = z.object({
  senderFirstName: z.string().min(1, "Sender first name is required"),
  senderLastName: z.string().min(1, "Sender last name is required"),
  senderPhone: z.string().min(7, "Sender phone is required"),
  idType: z.enum(idTypeOptions, { message: "Sender ID type is required" }),
  idNumber: z.string().min(1, "Sender ID number is required"),
  idExpiryDate: z.string().min(1, "Sender ID expiry date is required"),
  idImageDataUrl: z.string().min(1, "ID image is required"),
});
export type SenderId = z.infer<typeof senderIdSchema>;

export interface DropOffSubmission {
  referenceNumber: string;
  consignee: Consignee;
  boxes: Box[];
  terms: Terms;
  sender: SenderId;
  submittedAt: string;
}

export const STORAGE_KEY = "ppp-dropoff-draft-v1";
