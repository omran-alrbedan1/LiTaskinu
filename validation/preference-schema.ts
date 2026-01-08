import { z } from "zod";

export const preferenceSchema = z.object({
  // Basic Preferences
  religion: z.string().min(1, "Religion is required"),
  marital_status: z.enum(["single", "married", "widowed", "divorced"]),
  born_reverted: z.enum(["born_muslim", "reverted"]),
  
  // Appearance Preferences
  hair_color: z.string().optional(),
  eye_color: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  body_style: z.string().optional(),
  
  // Lifestyle Preferences
  job: z.string().optional(),
  is_smoker: z.coerce.boolean(),
  children_count: z.coerce.number().int().nonnegative(),
  want_more_children: z.enum(["yes", "no", "not_sure"]),
  employment_status: z.string().optional(),
  living_situation: z.string().optional(),
  has_house: z.coerce.boolean(),
  house_type: z.string().optional(),
  has_vehicle: z.coerce.boolean(),
  is_sporty: z.coerce.boolean(),
  willing_to_relocate: z.coerce.boolean(),
  
  // Education & Language
  education: z.string().optional(),
  language: z.string().optional(),
  languages_spoken: z.string().optional(),
  
  // Religious & Cultural
  religious_commitment: z.enum(["low", "medium", "high"]),
  wear_hijab: z.enum(["yes", "sometimes", "no"]),
  polygamy: z.enum(["accept", "maybe", "do_not_accept"]),
  profile_creator: z.string().optional(),
  
  // Descriptions
  partner_description: z.string().optional(),
  partner_preferences: z.string().optional(),
});

export type PreferenceFormData = z.infer<typeof preferenceSchema>;