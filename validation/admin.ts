import z from "zod";

export const CountryFormValidation = z.object({
  code: z
    .string()
    .min(2, "Country code must be at least 2 characters")
    .max(3, "Country code must be at most 3 characters"),
  name: z.object({
    en: z.string().min(1, "English name is required"),
    ar: z.string().min(1, "Arabic name is required"),
    fr: z.string().optional(),
    es: z.string().optional(),
    ru: z.string().optional(),
  }),
});

// validation/admin.ts
export const CityFormValidation = z.object({
  country_id: z.string().min(1, "Please select a country"),
  name: z.object({
    en: z.string().min(1, "English name is required"),
    ar: z.string().min(1, "Arabic name is required"),
    fr: z.string().optional(),
    es: z.string().optional(),
    ru: z.string().optional(),
  }),
});
