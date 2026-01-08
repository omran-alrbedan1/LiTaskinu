import { Heart, Eye, Coffee, BookOpen, GraduationCap } from "lucide-react";
import { FIELD_OPTIONS } from "./shared-fields";

export const PREFERENCE_SECTIONS: EditProfileSection[] = [
  {
    id: "basicPreferences",
    title: "Basic Preferences",
    icon: Heart,
    description: "Basic partner preferences",
    fields: [
      {
        name: "religion",
        label: "Preferred Religion",
        type: "input",
        placeholder: "e.g., Islam, Christianity, etc.",
      },
      {
        name: "marital_status",
        label: "Preferred Marital Status",
        type: "radio",
        options: FIELD_OPTIONS.maritalStatus,
      },
      {
        name: "born_reverted",
        label: "Preferred Born/Reverted",
        type: "radio",
        options: FIELD_OPTIONS.bornReverted,
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
        type: "radio",
        options: FIELD_OPTIONS.hairColor,
      },
      {
        name: "eye_color",
        label: "Preferred Eye Color",
        type: "radio",
        options: FIELD_OPTIONS.eyeColor,
      },
      {
        name: "height",
        label: "Preferred Height",
        type: "input",
        placeholder: "e.g., 5'8\" or 172 cm",
      },
      {
        name: "weight",
        label: "Preferred Weight",
        type: "input",
        placeholder: "e.g., 150 lbs or 68 kg",
      },
      {
        name: "body_style",
        label: "Preferred Body Style",
        type: "radio",
        options: FIELD_OPTIONS.bodyStyle,
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
        type: "input",
        placeholder: "Desired partner's profession",
      },
      {
        name: "is_smoker",
        label: "Accept Smoker",
        type: "radio",
        options: FIELD_OPTIONS.yesNoBoolean,
      },
      {
        name: "is_sporty",
        label: "Preferred Sporty",
        type: "radio",
        options: FIELD_OPTIONS.yesNoBoolean,
      },
      {
        name: "has_house",
        label: "Should Have House",
        type: "radio",
        options: FIELD_OPTIONS.yesNoBoolean,
      },
      {
        name: "house_type",
        label: "Preferred House Type",
        type: "radio",
        options: FIELD_OPTIONS.houseType,
      },
      {
        name: "has_vehicle",
        label: "Should Have Vehicle",
        type: "radio",
        options: FIELD_OPTIONS.yesNoBoolean,
      },
      {
        name: "willing_to_relocate",
        label: "Partner Should Relocate",
        type: "radio",
        options: FIELD_OPTIONS.yesNoBoolean,
      },
      {
        name: "children_count",
        label: "Accept Children",
        type: "number",
        placeholder: "0",
      },
      {
        name: "want_more_children",
        label: "Should Want More Children",
        type: "radio",
        options: FIELD_OPTIONS.childrenPreference,
      },
      {
        name: "employment_status",
        label: "Preferred Employment Status",
        type: "radio",
        options: FIELD_OPTIONS.employmentStatus,
      },
      {
        name: "living_situation",
        label: "Preferred Living Situation",
        type: "radio",
        options: FIELD_OPTIONS.livingSituation,
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
        type: "input",
        placeholder: "e.g., Bachelor's Degree, Master's, etc.",
      },
      {
        name: "language",
        label: "Preferred Language",
        type: "input",
        placeholder: "Preferred partner language",
      },
      {
        name: "languages_spoken",
        label: "Preferred Languages Spoken",
        type: "input",
        placeholder: "Preferred languages partner speaks",
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
        type: "radio",
        options: FIELD_OPTIONS.religiousCommitment,
      },
      {
        name: "wear_hijab",
        label: "Should Wear Hijab",
        type: "radio",
        options: FIELD_OPTIONS.hijabPreference,
      },
      {
        name: "polygamy",
        label: "Polygamy Preference",
        type: "radio",
        options: FIELD_OPTIONS.polygamyPreference,
      },
      {
        name: "profile_creator",
        label: "Preferred Profile Creator",
        type: "radio",
        options: FIELD_OPTIONS.profileCreator,
      },
      {
        name: "partner_description",
        label: "Partner Description",
        type: "textarea",
        placeholder: "Describe your ideal partner...",
      },
      {
        name: "partner_preferences",
        label: "Additional Preferences",
        type: "textarea",
        placeholder: "Any other preferences...",
      },
    ],
  },
];
