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

export const stepSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters"),
});

export const SocialMediaFormValidation = z.object({
  name: z.string().min(2).max(50),
  type: z.enum(["social", "contact"]),
  value: z.string(),
  icon: z.string().min(1),
   is_active: z.enum(["true", "false"]),

});

export type SocialMediaFormValues = z.infer<
  typeof SocialMediaFormValidation
>;

export const FAQFormValidation = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(5, "Answer must be at least 5 characters"),
  is_active: z.enum(["true", "false"]),
});

export type FAQFormValues = z.infer<typeof FAQFormValidation>;


export const SuccessStoryFormValidation = z.object({
  name_male: z.string().min(1, "Male name is required"),
  name_female: z.string().min(1, "Female name is required"),
  description: z.string().min(1, "Description is required"),
  testimonial: z.string(),
  rating: z.string().min(1, "Rating is required"),
  country_id: z.string().min(1, "Country is required"),
  city_id: z.string().min(1, "City is required"),
});
export type SuccessStoryFormValues = z.infer<typeof SuccessStoryFormValidation>;
