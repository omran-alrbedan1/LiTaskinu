import { z } from "zod";

export const PREFERENCE_OPTIONS = {
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

// Create a simple schema without coerce
export const preferenceSchema = z.object({
  // Basic Information
  religion: z.string().optional(),
  religious_commitment: z.string().optional(),
  marital_status: z.string().optional(),
  children_count: z.number().min(0).optional(),
  born_reverted: z.string().optional(),
  
  // Appearance
  hair_color: z.string().optional(),
  eye_color: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  body_style: z.string().optional(),
  
  // Lifestyle - keep as string for radio buttons
  is_sporty: z.string().optional(),
  is_smoker: z.string().optional(),
  has_house: z.string().optional(),
  house_type: z.string().optional(),
  has_vehicle: z.string().optional(),
  willing_to_relocate: z.string().optional(),
  
  // Career & Education
  job: z.string().optional(),
  education: z.string().optional(),
  employment_status: z.string().optional(),
  living_situation: z.string().optional(),
  
  // Family & Preferences
  want_more_children: z.string().optional(),
  wear_hijab: z.string().optional(),
  polygamy: z.string().optional(),
  profile_creator: z.string().optional(),
  
  // Languages
  languages_spoken: z.string().optional(),
});

export type PreferenceFormData = z.infer<typeof preferenceSchema>;