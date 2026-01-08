import { PREFERENCE_OPTIONS } from "@/validation/preference-schema";
import {
  User,
  Eye,
  Briefcase, 
  Heart,
  Globe, 
  Users
} from "lucide-react";

export const PREFERENCE_SECTIONS = [
  {
    id: "basicInfo",
    title: "Basic Information Preferences",
    icon: User,
    description: "Desired partner's personal details",
    fields: [
      {
        name: "religion",
        label: "Religion Preference",
        type: "input" as const,
      },
      {
        name: "religious_commitment",
        label: "Religious Commitment Preference",
        type: "radio" as const,
        options: PREFERENCE_OPTIONS.religious_commitment.map(opt => ({ 
          value: opt, 
          label: opt.charAt(0).toUpperCase() + opt.slice(1) 
        })),
      },
      {
        name: "marital_status",
        label: "Marital Status Preference",
        type: "radio" as const,
        options: PREFERENCE_OPTIONS.marital_status.map(opt => ({ 
          value: opt, 
          label: opt.charAt(0).toUpperCase() + opt.slice(1) 
        })),
      },
      {
        name: "children_count",
        label: "Preferred Number of Children (if any)",
        type: "number" as const,
        min: 0,
        placeholder: "0",
      },
      {
        name: "born_reverted",
        label: "Born Muslim or Reverted Preference",
        type: "radio" as const,
        options: PREFERENCE_OPTIONS.born_reverted.map(opt => ({ 
          value: opt, 
          label: opt === "born_muslim" ? "Born Muslim" : "Reverted" 
        })),
      },
    ],
  },
  {
    id: "appearance",
    title: "Appearance Preferences",
    icon: Eye,
    description: "Desired physical characteristics",
    fields: [
      {
        name: "hair_color",
        label: "Preferred Hair Color",
        type: "radio" as const,
        options: PREFERENCE_OPTIONS.hair_color.map(opt => ({ value: opt, label: opt })),
      },
      {
        name: "eye_color",
        label: "Preferred Eye Color",
        type: "radio" as const,
        options: PREFERENCE_OPTIONS.eye_color.map(opt => ({ value: opt, label: opt })),
      },
      {
        name: "height",
        label: "Preferred Height Range",
        type: "input" as const,
        placeholder: "e.g., 160-180 cm",
      },
      {
        name: "weight",
        label: "Preferred Weight Range",
        type: "input" as const,
        placeholder: "e.g., 50-80 kg",
      },
      {
        name: "body_style",
        label: "Preferred Body Style",
        type: "radio" as const,
        options: PREFERENCE_OPTIONS.body_style.map(opt => ({ value: opt, label: opt })),
      },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle Preferences",
    icon: Heart,
    description: "Desired lifestyle and habits",
    fields: [
      {
        name: "is_sporty",
        label: "Should they exercise regularly?",
        type: "radio" as const,
        options: [
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
          { value: "", label: "No Preference" },
        ],
      },
      {
        name: "is_smoker",
        label: "Smoking Preference",
        type: "radio" as const,
        options: [
          { value: "1", label: "Smoker Accepted" },
          { value: "0", label: "Non-smoker Only" },
          { value: "", label: "No Preference" },
        ],
      },
      {
        name: "has_house",
        label: "Should they own a house?",
        type: "radio" as const,
        options: [
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
          { value: "", label: "No Preference" },
        ],
      },
      {
        name: "house_type",
        label: "Preferred House Type",
        type: "radio" as const,
        options: [
          ...PREFERENCE_OPTIONS.house_type.map(opt => ({ 
            value: opt, 
            label: opt.charAt(0).toUpperCase() + opt.slice(1) 
          })),
          { value: "", label: "No Preference" }
        ],
      },
      {
        name: "has_vehicle",
        label: "Should they have a vehicle?",
        type: "radio" as const,
        options: [
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
          { value: "", label: "No Preference" },
        ],
      },
      {
        name: "willing_to_relocate",
        label: "Should they be willing to relocate?",
        type: "radio" as const,
        options: [
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
          { value: "", label: "No Preference" },
        ],
      },
    ],
  },
  {
    id: "careerEducation",
    title: "Career & Education Preferences",
    icon: Briefcase,
    description: "Desired professional and educational background",
    fields: [
      {
        name: "job",
        label: "Preferred Job/Profession",
        type: "input" as const,
        placeholder: "e.g., Any Professional Field",
      },
      {
        name: "education",
        label: "Preferred Education Level",
        type: "input" as const,
        placeholder: "e.g., Bachelor's Degree or higher",
      },
      {
        name: "employment_status",
        label: "Preferred Employment Status",
        type: "radio" as const,
        options: [
          ...PREFERENCE_OPTIONS.employment_status.map(opt => ({ value: opt, label: opt })),
          { value: "", label: "No Preference" }
        ],
      },
      {
        name: "living_situation",
        label: "Preferred Living Situation",
        type: "radio" as const,
        options: [
          ...PREFERENCE_OPTIONS.living_situation.map(opt => ({ value: opt, label: opt })),
          { value: "", label: "No Preference" }
        ],
      },
    ],
  },
  {
    id: "familyPreferences",
    title: "Family & Lifestyle Preferences",
    icon: Users,
    description: "Desired family planning and lifestyle preferences",
    fields: [
      {
        name: "want_more_children",
        label: "Should they want more children?",
        type: "radio" as const,
        options: [
          ...PREFERENCE_OPTIONS.want_more_children.map(opt => ({ 
            value: opt, 
            label: opt === "not_sure" ? "Not Sure" : opt.charAt(0).toUpperCase() + opt.slice(1) 
          })),
          { value: "", label: "No Preference" }
        ],
      },
      {
        name: "wear_hijab",
        label: "Hijab Preference",
        type: "radio" as const,
        options: [
          ...PREFERENCE_OPTIONS.wear_hijab.map(opt => ({ 
            value: opt, 
            label: opt.charAt(0).toUpperCase() + opt.slice(1) 
          })),
          { value: "", label: "No Preference" }
        ],
      },
      {
        name: "polygamy",
        label: "Views on polygamy",
        type: "radio" as const,
        options: [
          ...PREFERENCE_OPTIONS.polygamy.map(opt => ({ 
            value: opt, 
            label: opt === "do_not_accept" ? "Do Not Accept" : 
                   opt === "accept" ? "Accept" : 
                   opt.charAt(0).toUpperCase() + opt.slice(1) 
          })),
          { value: "", label: "No Preference" }
        ],
      },
      {
        name: "profile_creator",
        label: "Profile Creator Preference",
        type: "radio" as const,
        options: [
          ...PREFERENCE_OPTIONS.profile_creator.map(opt => ({ 
            value: opt, 
            label: opt === "brother_or_sister" ? "Brother/Sister" : 
                   opt === "any" ? "Any" :
                   opt.charAt(0).toUpperCase() + opt.slice(1) 
          })),
          { value: "", label: "No Preference" }
        ],
      },
    ],
  },
  {
    id: "languages",
    title: "Language Preferences",
    icon: Globe,
    description: "Desired language skills",
    fields: [
      {
        name: "languages_spoken",
        label: "Preferred Languages Spoken",
        type: "input" as const,
        placeholder: "e.g., English, Arabic (optional)",
      },
    ],
  },
];

export type PreferenceField = {
  name: string;
  label: string;
  type: "input" | "textarea" | "radio" | "number" | "multiSelect" | "checkbox";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  min?: number;
  max?: number;
};

export type PreferenceSection = {
  id: string;
  title: string;
  icon: any;
  description: string;
  fields: PreferenceField[];
};