import { User, Eye, Coffee, GraduationCap, BookOpen } from "lucide-react";
import { FIELD_OPTIONS } from "./field-options";

export const BASE_SECTIONS = [
  {
    id: "basicInfo",
    title: "Basic Information",
    icon: User,
    description: "Your basic personal details",
    fields: [
      {
        key: "gender",
        label: "Gender",
        type: "radio",
        options: FIELD_OPTIONS.gender,
      },
      { key: "age", label: "Age", type: "number" },
      { key: "livesIn", label: "Lives In", type: "text" },
      {
        key: "relocate",
        label: "Willing to Relocate",
        type: "radio",
        options: FIELD_OPTIONS.relocate,
      },
    ],
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Eye,
    description: "Your physical characteristics",
    fields: [
      {
        key: "hairColor",
        label: "Hair Color",
        type: "radio",
        options: FIELD_OPTIONS.hairColor,
      },
      {
        key: "eyeColor",
        label: "Eye Color",
        type: "radio",
        options: FIELD_OPTIONS.eyeColor,
      },
      { key: "height", label: "Height", type: "text" },
      { key: "weight", label: "Weight", type: "text" },
      {
        key: "bodyStyle",
        label: "Body Style",
        type: "radio",
        options: FIELD_OPTIONS.bodyStyle,
      },
      {
        key: "ethnicity",
        label: "Ethnicity",
        type: "radio",
        options: FIELD_OPTIONS.ethnicity,
      },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    icon: Coffee,
    description: "Your lifestyle habits and family preferences",
    fields: [
      {
        key: "smoke",
        label: "Smoking",
        type: "radio",
        options: FIELD_OPTIONS.smoke,
      },
      {
        key: "maritalStatus",
        label: "Marital Status",
        type: "radio",
        options: FIELD_OPTIONS.maritalStatus,
      },
      {
        key: "haveChildren",
        label: "Have Children",
        type: "radio",
        options: FIELD_OPTIONS.haveChildren,
      },
      {
        key: "wantMoreChildren",
        label: "Want More Children",
        type: "radio",
        options: FIELD_OPTIONS.wantMoreChildren,
      },
      {
        key: "livingSituation",
        label: "Living Situation",
        type: "radio",
        options: FIELD_OPTIONS.livingSituation,
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    description: "Your educational background",
    fields: [{ key: "education", label: "Education Level", type: "text" }],
  },
  {
    id: "religious",
    title: "Religious & Cultural",
    icon: BookOpen,
    description: "Your religious and cultural background",
    fields: [
      {
        key: "bornReverted",
        label: "Born/Reverted",
        type: "radio",
        options: FIELD_OPTIONS.bornReverted,
      },
      {
        key: "religiousValues",
        label: "Religious Values",
        type: "radio",
        options: FIELD_OPTIONS.religiousValues,
      },
      {
        key: "attendReligiousServices",
        label: "Attend Religious Services",
        type: "radio",
        options: FIELD_OPTIONS.attendReligiousServices,
      },
      {
        key: "readQuran",
        label: "Read Quran",
        type: "radio",
        options: FIELD_OPTIONS.readQuran,
      },
      {
        key: "familyValues",
        label: "Family Values",
        type: "radio",
        options: FIELD_OPTIONS.familyValues,
      },
      {
        key: "languagesSpoken",
        label: "Languages Spoken",
        type: "checkbox",
        options: FIELD_OPTIONS.languages,
      },
    ],
  },
];
