import { z } from "zod";

/* ─── Step 1: Zip Code ─── */
export const ZipCodeSchema = z.object({
  zipCode: z
    .string()
    .min(5, "Enter a valid 5-digit ZIP")
    .max(5, "Enter a valid 5-digit ZIP")
    .regex(/^\d{5}$/, "ZIP must be 5 digits"),
});

/* ─── Step 2: Gate Type ─── */
export const GATE_TYPES = [
  "Residential Driveway Gate",
  "HOA / Community",
  "Apartment Complex",
  "Commercial",
  "Ranch",
] as const;

export const GateTypeSchema = z.object({
  gateType: z.string().min(1, "Select a gate type"),
});

/* ─── Step 3: Brand ─── */
export const BRANDS = [
  "LiftMaster",
  "DoorKing",
  "Mighty Mule",
  "Viking",
  "Linear",
  "FAAC",
  "Ghost Controls",
  "Unsure",
] as const;

export const BrandSchema = z.object({
  brand: z.string().min(1, "Select a brand"),
});

/* ─── Step 4: Primary Issue ─── */
export const ISSUES = [
  "Stuck Open",
  "Stuck Closed",
  "Keypad / Intercom Dead",
  "Beeping / Battery Dead",
  "Won't Move",
  "Hit by Car",
] as const;

export const IssueSchema = z.object({
  primaryIssue: z.string().min(1, "Select an issue"),
});

/* ─── Step 5: Contact Info ─── */
export const ContactInfoSchema = z.object({
  firstName: z.string().min(1, "First name required").max(50),
  lastName: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(10, "Enter a valid phone")
    .max(15)
    .regex(/^[\d\s\-\(\)\+]+$/, "Invalid phone format"),
});

/* ─── Tracking (hidden fields) ─── */
export const TrackingSchema = z.object({
  sourceUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  referrer: z.string().optional(),
});

/* ─── Combined Schema ─── */
export const LeadFormSchema = ZipCodeSchema
  .merge(GateTypeSchema)
  .merge(BrandSchema)
  .merge(IssueSchema)
  .merge(ContactInfoSchema)
  .merge(TrackingSchema);

/* ─── Types ─── */
export type ZipCodeData = z.infer<typeof ZipCodeSchema>;
export type GateTypeData = z.infer<typeof GateTypeSchema>;
export type BrandData = z.infer<typeof BrandSchema>;
export type IssueData = z.infer<typeof IssueSchema>;
export type ContactInfoData = z.infer<typeof ContactInfoSchema>;
export type TrackingData = z.infer<typeof TrackingSchema>;
export type LeadFormData = z.infer<typeof LeadFormSchema>;
