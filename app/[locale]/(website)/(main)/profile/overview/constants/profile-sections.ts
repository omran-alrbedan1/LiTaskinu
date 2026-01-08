import {
  User,
  Eye,
  Coffee,
  BookOpen,
  GraduationCap,
} from "lucide-react";

export const PROFILE_SECTIONS = [
  {
    id: "basicInfo",
    title: "Basic Information",
    icon: User,
    description: "Personal details and background",
    fields: [
      {
        name: "religion",
        label: "Religion",
        type: "input" as const,
        placeholder: "Enter your religion",
      },
      {
        name: "marital_status",
        label: "Marital Status",
        type: "radio" as const,
        options: [
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "widowed", label: "Widowed" },
          { value: "divorced", label: "Divorced" },
        ],
      },
      {
        name: "willing_to_relocate",
        label: "Willing to Relocate",
        type: "radio" as const,
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        name: "partner_preferences",
        label: "Partner Preferences",
        type: "textarea" as const,
        placeholder: "Describe what you're looking for in a partner...",
        section: "seeking" as const,
      },
    ],
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Eye,
    description: "Physical characteristics",
    fields: [
      {
        name: "hair_color",
        label: "Hair Color",
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
        label: "Eye Color",
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
        label: "Height",
        type: "input" as const,
        placeholder: "e.g., 5'8\" or 172 cm",
      },
      {
        name: "weight",
        label: "Weight",
        type: "input" as const,
        placeholder: "e.g., 150 lbs or 68 kg",
      },
      {
        name: "body_style",
        label: "Body Style",
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
    id: "lifestyle",
    title: "Lifestyle",
    icon: Coffee,
    description: "Lifestyle and habits",
    fields: [
      {
        name: "job",
        label: "Occupation",
        type: "input" as const,
        placeholder: "Your current job/profession",
      },
      {
        name: "is_smoker",
        label: "Smoking",
        type: "radio" as const,
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        name: "children_count",
        label: "Children Count",
        type: "number" as const,
        placeholder: 0,
      },
      {
        name: "want_more_children",
        label: "Want More Children",
        type: "radio" as const,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not_sure", label: "Not Sure" },
        ],
      },
      {
        name: "employment_status",
        label: "Employment Status",
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
        label: "Living Situation",
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
        label: "Has House",
        type: "radio" as const,
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        name: "house_type",
        label: "House Type",
        type: "radio" as const,
        options: [
          { value: "ownership", label: "Ownership" },
          { value: "rent", label: "Rent" },
        ],
      },
      {
        name: "has_vehicle",
        label: "Has Vehicle",
        type: "radio" as const,
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        name: "is_sporty",
        label: "Sporty",
        type: "radio" as const,
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
    ],
  },
  {
    id: "educationLanguage",
    title: "Education & Language",
    icon: GraduationCap,
    description: "Educational background and language skills",
    fields: [
      {
        name: "education",
        label: "Education Level",
        type: "input" as const,
        placeholder: "e.g., Bachelor's Degree, Master's, etc.",
      },
      {
        name: "language",
        label: "Primary Language",
        type: "input" as const,
        placeholder: "Your primary language",
      },
      {
        name: "languages_spoken",
        label: "Languages Spoken",
        type: "input" as const,
     
      },
    ],
  },
  {
    id: "religiousCultural",
    title: "Religious & Cultural Background",
    icon: BookOpen,
    description: "Religious practices and cultural background",
    fields: [
      {
        name: "religious_commitment",
        label: "Religious Commitment",
        type: "radio" as const,
        options: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ],
      },
      {
        name: "born_reverted",
        label: "Born/Reverted",
        type: "radio" as const,
        options: [
          { value: "born_muslim", label: "Born Muslim" },
          { value: "reverted", label: "Reverted" },
        ],
      },
      {
        name: "wear_hijab",
        label: "Wears Hijab",
        type: "radio" as const,
        options: [
          { value: "yes", label: "Yes" },
          { value: "sometimes", label: "Sometimes" },
          { value: "no", label: "No" },
        ],
      },
      {
        name: "polygamy",
        label: "Polygamy",
        type: "radio" as const,
        options: [
          { value: "accept", label: "Accept" },
          { value: "maybe", label: "Maybe" },
          { value: "do_not_accept", label: "Do Not Accept" },
        ],
      },
      {
        name: "profile_creator",
        label: "Profile Creator",
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
        name: "bio",
        label: "Bio",
        type: "textarea" as const,
        placeholder: "Tell us about yourself...",
      },
      {
        name: "partner_description",
        label: "Partner Description",
        type: "textarea" as const,
        placeholder: "Describe your ideal partner...",
        section: "seeking" as const,
      },
    ],
  },
];

// Type definitions
// Type definitions
export type ProfileField = {
  name: string;
  label: string;
  type: "input" | "textarea" | "radio" | "number" | "multiSelect" | "checkbox";
  section?: "personal" | "seeking";
  placeholder?: string | number; 
  options?: { value: string | number; label: string }[]; 
};

export type ProfileSection = {
  id: string;
  title: string;
  icon: any; // Lucide icon component
  description: string;
  fields: ProfileField[];
};