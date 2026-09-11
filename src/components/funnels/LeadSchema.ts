import { z } from "zod";

// Shared Zod schema for full enquiry matching prompt specifications
export const LeadSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must contain letters only.")
    .regex(/^[a-zA-Z\s]+$/, "Letters only"),
  email: z.string().email("Please provide a valid work email"),
  countryCode: z.string().min(1, "Country code required"),
  phone: z.string().min(7, "Invalid phone number"),
  service: z.string().optional(),
  projectDescription: z
    .string()
    .min(20, "Please provide at least 20 characters of detail"),
  ndaRequested: z.boolean(),
  mathCaptchaAnswer: z.number({
    required_error: "Captcha solution required",
    invalid_type_error: "Answer must be a number",
  }),
  source: z.string(),
  token: z.string().optional(),
});

export type LeadFormData = z.infer<typeof LeadSchema>;

// Light 2-field form schema for "Call in 30 Min" lightbox
export const QuickCallSchema = z.object({
  fullName: z.string().min(2, "Name must contain letters only."),
  countryCode: z.string(),
  phone: z.string().min(7, "Invalid phone number"),
  preferredTime: z.string().optional(),
  serviceContext: z.string().optional(),
});

export type QuickCallFormData = z.infer<typeof QuickCallSchema>;

// Quick enquiry drawer schema
export const QuickEnquirySchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone number required"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  notes: z.string().min(10, "Please enter at least 10 characters"),
});

export type QuickEnquiryFormData = z.infer<typeof QuickEnquirySchema>;
