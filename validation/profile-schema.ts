import { z } from "zod";

export const FIELD_OPTIONS = {
  religious_commitment: ["low", "medium", "high"] as const,
  marital_status: ["single", "married", "widowed", "divorced"] as const,
  house_type: ["ownership", "rent"] as const,
  want_more_children: ["yes", "no", "not_sure"] as const,
  born_reverted: ["born_muslim", "reverted"] as const,
  wear_hijab: ["yes", "sometimes", "no"] as const,
  polygamy: ["accept", "maybe", "do_not_accept"] as const,
  profile_creator: ["self", "parent", "friend", "brother_or_sister", "relative", "any"] as const,
  body_style: ["Slim", "Athletic", "Average", "Muscular", "Curvy", "Plus Size"] as const,
  hair_color: ["Black", "Brown", "Blonde", "Red", "Auburn", "Grey", "White", "Other"] as const,
  eye_color: ["Brown", "Hazel", "Blue", "Green", "Grey", "Black", "Other"] as const,
  living_situation: [
    "Live Alone",
    "Live with friends",
    "Live with family",
    "Live with spouse",
    "Live with kids",
    "Other",
    "Prefer not to say",
  ] as const,
  employment_status: [
    "Full Time",
    "Part Time",
    "Student",
    "Not Employed",
    "Retired",
    "Homemaker",
    "Prefer not to say",
    "Other",
  ] as const,
  languages: ["Arabic", "English", "French", "Spanish", "Urdu", "Turkish", "Other"] as const,
};


export const profileSchema = z.object({
  // Basic Information
  religion: z.string().optional(),
  religious_commitment: z.enum(["low", "medium", "high"]),
  marital_status: z.enum(["single", "married", "widowed", "divorced"]),
  children_count: z.coerce.number().int().nonnegative(),
  born_reverted: z.enum(["born_muslim", "reverted"]),
  
  // Appearance
  hair_color: z.string().optional(),
  eye_color: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  body_style: z.string().optional(),
  
  // Lifestyle
  is_sporty: z.coerce.number().min(0).max(1),
  is_smoker: z.coerce.number().min(0).max(1),
  has_house: z.coerce.number().min(0).max(1),
  house_type: z.string().optional(),
  has_vehicle: z.coerce.number().min(0).max(1),
  willing_to_relocate: z.coerce.number().min(0).max(1),
  
  // Career & Education
  job: z.string().optional(),
  education: z.string().optional(),
  employment_status: z.string().optional(),
  living_situation: z.string().optional(),
  
  // Family & Preferences
  want_more_children: z.enum(["yes", "no", "not_sure"]),
  wear_hijab: z.enum(["yes", "sometimes", "no"]),
  polygamy: z.enum(["accept", "maybe", "do_not_accept"]),
  profile_creator: z.string().optional(),
  
  // Languages & About
  languages_spoken: z.string().optional(),
  bio: z.string().optional(),
  partner_description: z.string().optional(),
  partner_preferences: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;