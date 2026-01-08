import {
  Heart,
  Eye,
  Coffee,
  BookOpen,
  GraduationCap
} from "lucide-react";

export const PREFERENCE_SECTIONS = [
  {
    id: "basicPreferences",
    title: "Basic Preferences",
    icon: Heart,
    description: "Basic partner preferences",
    fields: [
      {
        name: "religion",
        label: "Preferred Religion",
        type: "input" as const,
        placeholder: "e.g., Islam, Christianity, etc.",
      },
      {
        name: "marital_status",
        label: "Preferred Marital Status",
        type: "radio" as const,
        options: [
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "widowed", label: "Widowed" },
          { value: "divorced", label: "Divorced" },
        ],
      },
      {
        name: "born_reverted",
        label: "Preferred Born/Reverted",
        type: "radio" as const,
        options: [
          { value: "born_muslim", label: "Born Muslim" },
          { value: "reverted", label: "Reverted" },
        ],
      },
    ],
  },
  {
    id: "appearancePreferences",
    title: "Appearance Preferences",
    icon: Eye,
    description: "Physical appearance preferences",
    fields: [
      {
        name: "hair_color",
        label: "Preferred Hair Color",
        type: "radio" as const,
        options: [
          { value: "Black", label: "Black" },
          { value: "Brown", label: "Brown" },
          { value: "Blonde", label: "Blonde" },
          { value: "Red", label: "Red" },
          { value: "Auburn", label: "Auburn" },
          { value: "Grey", label: "Grey" },
          { value: "White", label: "White" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        name: "eye_color",
        label: "Preferred Eye Color",
        type: "radio" as const,
        options: [
          { value: "Brown", label: "Brown" },
          { value: "Hazel", label: "Hazel" },
          { value: "Blue", label: "Blue" },
          { value: "Green", label: "Green" },
          { value: "Grey", label: "Grey" },
          { value: "Black", label: "Black" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        name: "height",
        label: "Preferred Height",
        type: "input" as const,
        placeholder: "e.g., 5'8\" or 172 cm",
      },
      {
        name: "weight",
        label: "Preferred Weight",
        type: "input" as const,
        placeholder: "e.g., 150 lbs or 68 kg",
      },
      {
        name: "body_style",
        label: "Preferred Body Style",
        type: "radio" as const,
        options: [
          { value: "Slim", label: "Slim" },
          { value: "Athletic", label: "Athletic" },
          { value: "Average", label: "Average" },
          { value: "Muscular", label: "Muscular" },
          { value: "Curvy", label: "Curvy" },
          { value: "Plus Size", label: "Plus Size" },
        ],
      },
    ],
  },
  {
    id: "lifestylePreferences",
    title: "Lifestyle Preferences",
    icon: Coffee,
    description: "Lifestyle and habits preferences",
    fields: [
      {
        name: "job",
        label: "Preferred Occupation",
        type: "input" as const,
        placeholder: "Desired partner's profession",
      },
      {
        name: "is_smoker",
        label: "Accept Smoker",
        type: "radio" as const,
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        name: "children_count",
        label: "Accept Children",
        type: "number" as const,
        placeholder: 0,
      },
      {
        name: "want_more_children",
        label: "Should Want More Children",
        type: "radio" as const,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not_sure", label: "Not Sure" },
        ],
      },
      {
        name: "employment_status",
        label: "Preferred Employment Status",
        type: "radio" as const,
        options: [
          { value: "Full Time", label: "Full Time" },
          { value: "Part Time", label: "Part Time" },
          { value: "Student", label: "Student" },
          { value: "Not Employed", label: "Not Employed" },
          { value: "Retired", label: "Retired" },
          { value: "Homemaker", label: "Homemaker" },
          { value: "Prefer not to say", label: "Prefer not to say" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        name: "living_situation",
        label: "Preferred Living Situation",
        type: "radio" as const,
        options: [
          { value: "Live Alone", label: "Live Alone" },
          { value: "Live with friends", label: "Live with friends" },
          { value: "Live with family", label: "Live with family" },
          { value: "Live with spouse", label: "Live with spouse" },
          { value: "Live with kids", label: "Live with kids" },
          { value: "Other", label: "Other" },
          { value: "Prefer not to say", label: "Prefer not to say" },
        ],
      },
      {
        name: "has_house",
        label: "Should Have House",
        type: "radio" as const,
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        name: "house_type",
        label: "Preferred House Type",
        type: "radio" as const,
        options: [
          { value: "ownership", label: "Ownership" },
          { value: "rent", label: "Rent" },
        ],
      },
      {
        name: "has_vehicle",
        label: "Should Have Vehicle",
        type: "radio" as const,
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        name: "is_sporty",
        label: "Preferred Sporty",
        type: "radio" as const,
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        name: "willing_to_relocate",
        label: "Partner Should Relocate",
        type: "radio" as const,
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
    ],
  },
  {
    id: "educationLanguagePreferences",
    title: "Education & Language Preferences",
    icon: GraduationCap,
    description: "Educational and language preferences",
    fields: [
      {
        name: "education",
        label: "Preferred Education Level",
        type: "input" as const,
        placeholder: "e.g., Bachelor's Degree, Master's, etc.",
      },
      {
        name: "language",
        label: "Preferred Language",
        type: "input" as const,
        placeholder: "Preferred partner language",
      },
      {
        name: "languages_spoken",
        label: "Preferred Languages Spoken",
        type: "input" as const,
      },
    ],
  },
  {
    id: "religiousCulturalPreferences",
    title: "Religious & Cultural Preferences",
    icon: BookOpen,
    description: "Religious and cultural preferences",
    fields: [
      {
        name: "religious_commitment",
        label: "Preferred Religious Commitment",
        type: "radio" as const,
        options: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ],
      },
      {
        name: "wear_hijab",
        label: "Should Wear Hijab",
        type: "radio" as const,
        options: [
          { value: "yes", label: "Yes" },
          { value: "sometimes", label: "Sometimes" },
          { value: "no", label: "No" },
        ],
      },
      {
        name: "polygamy",
        label: "Polygamy Preference",
        type: "radio" as const,
        options: [
          { value: "accept", label: "Accept" },
          { value: "maybe", label: "Maybe" },
          { value: "do_not_accept", label: "Do Not Accept" },
        ],
      },
      {
        name: "profile_creator",
        label: "Preferred Profile Creator",
        type: "radio" as const,
        options: [
          { value: "self", label: "Self" },
          { value: "parent", label: "Parent" },
          { value: "friend", label: "Friend" },
          { value: "brother_or_sister", label: "Brother/Sister" },
          { value: "relative", label: "Relative" },
          { value: "any", label: "Any" },
        ],
      },
      {
        name: "partner_description",
        label: "Partner Description",
        type: "textarea" as const,
        placeholder: "Describe your ideal partner...",
      },
      {
        name: "partner_preferences",
        label: "Additional Preferences",
        type: "textarea" as const,
        placeholder: "Any other preferences...",
      },
    ],
  },
];

// Type definitions
export type PreferenceField = {
  name: string;
  label: string;
  type: "input" | "textarea" | "radio" | "number" | "multiSelect" | "checkbox";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

export type PreferenceSection = {
  id: string;
  title: string;
  icon: any; // Lucide icon component
  description: string;
  fields: PreferenceField[];
};