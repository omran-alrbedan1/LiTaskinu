import { User, Eye, Coffee, BookOpen, GraduationCap } from "lucide-react";
import { FIELD_OPTIONS,  } from "./shared-fields";

export const PROFILE_SECTIONS: EditProfileSection[] = [
  {
    id: "basicInfo",
    title: "Basic Information",
    icon: User,
    description: "Personal details and background",
    fields: [
      {
        name: "religion",
        label: "Religion",
        type: "input",
        placeholder: "Enter your religion",
      },
      {
        name: "marital_status",
        label: "Marital Status",
        type: "radio",
        options: FIELD_OPTIONS.maritalStatus,
      },
      {
        name: "born_reverted",
        label: "Born/Reverted",
        type: "radio",
        options: FIELD_OPTIONS.bornReverted,
      },
      {
        name: "religious_commitment",
        label: "Religious Commitment",
        type: "radio",
        options: FIELD_OPTIONS.religiousCommitment,
      },
      {
        name: "children_count",
        label: "Children Count",
        type: "number",
        placeholder: "0",
      },
      {
        name: "willing_to_relocate",
        label: "Willing to Relocate",
        type: "radio",
        options: FIELD_OPTIONS.yesNo01,
      },
      {
        name: "partner_preferences",
        label: "Partner Preferences",
        type: "textarea",
        placeholder: "Describe what you're looking for in a partner...",
        section: "preference",
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
        type: "radio",
        options: FIELD_OPTIONS.hairColor,
      },
      {
        name: "eye_color",
        label: "Eye Color",
        type: "radio",
        options: FIELD_OPTIONS.eyeColor,
      },
      {
        name: "height",
        label: "Height",
        type: "input",
        placeholder: "e.g., 5'8\" or 172 cm",
      },
      {
        name: "weight",
        label: "Weight",
        type: "input",
        placeholder: "e.g., 150 lbs or 68 kg",
      },
      {
        name: "body_style",
        label: "Body Style",
        type: "radio",
        options: FIELD_OPTIONS.bodyStyle,
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
        type: "input",
        placeholder: "Your current job/profession",
      },
      {
        name: "is_smoker",
        label: "Smoking",
        type: "radio",
        options: FIELD_OPTIONS.yesNo01,
      },
      {
        name: "is_sporty",
        label: "Sporty",
        type: "radio",
        options: FIELD_OPTIONS.yesNo01,
      },
      {
        name: "has_house",
        label: "Has House",
        type: "radio",
        options: FIELD_OPTIONS.yesNo01,
      },
      {
        name: "house_type",
        label: "House Type",
        type: "radio",
        options: FIELD_OPTIONS.houseType,
      },
      {
        name: "has_vehicle",
        label: "Has Vehicle",
        type: "radio",
        options: FIELD_OPTIONS.yesNo01,
      },
      {
        name: "employment_status",
        label: "Employment Status",
        type: "radio",
        options: FIELD_OPTIONS.employmentStatus,
      },
      {
        name: "living_situation",
        label: "Living Situation",
        type: "radio",
        options: FIELD_OPTIONS.livingSituation,
      },
      {
        name: "want_more_children",
        label: "Want More Children",
        type: "radio",
        options: FIELD_OPTIONS.childrenPreference,
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
        type: "input",
        placeholder: "e.g., Bachelor's Degree, Master's, etc.",
      },
      {
        name: "languages_spoken",
        label: "Languages Spoken",
        type: "input",
        placeholder: "Languages you speak",
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
        name: "wear_hijab",
        label: "Wears Hijab",
        type: "radio",
        options: FIELD_OPTIONS.hijabPreference,
      },
      {
        name: "polygamy",
        label: "Polygamy",
        type: "radio",
        options: FIELD_OPTIONS.polygamyPreference,
      },
      {
        name: "profile_creator",
        label: "Profile Creator",
        type: "radio",
        options: FIELD_OPTIONS.profileCreator,
      },
      {
        name: "bio",
        label: "Bio",
        type: "textarea",
        placeholder: "Tell us about yourself...",
      },
      {
        name: "partner_description",
        label: "Partner Description",
        type: "textarea",
        placeholder: "Describe your ideal partner...",
        section: "preference",
      },
    ],
  },
];
