import { ICONS } from "./icons";

export const CLIENT_ID =
  "507971599114-9jr4uguscf3eku4nchkdk9n90u4u4ldu.apps.googleusercontent.com";

export const genderOptions = [
  {
    value: "male",
    label: "Male",
    icon: ICONS.male,
  },
  {
    value: "female",
    label: "Female",
    icon: ICONS.female,
  },
  {
    value: "other",
    label: "Other",
    icon: ICONS.user,
  },
];

export const countryOptions = [
  { value: "us", label: "United States", code: "US" },
  { value: "gb", label: "United Kingdom", code: "GB" },
  { value: "fr", label: "France", code: "FR" },
  { value: "de", label: "Germany", code: "DE" },
  { value: "it", label: "Italy", code: "IT" },
  { value: "es", label: "Spain", code: "ES" },
  { value: "ru", label: "Russia", code: "RU" },
  { value: "cn", label: "China", code: "CN" },
];
export const languageOptions = [
  { value: "en", label: "English", code: "US", native: "English" },
  { value: "ar", label: "Arabic", code: "SA", native: "العربية" },
  { value: "it", label: "Italian", code: "IT", native: "Italiano" },
  { value: "de", label: "German", code: "DE", native: "Deutsch" },
  { value: "es", label: "Spanish", code: "ES", native: "Español" },
  { value: "ru", label: "Russian", code: "RU", native: "Русский" },
  { value: "zh", label: "Chinese", code: "CN", native: "中文" },
];

export const kinshipOptions = [
  { value: "mother", label: "Mother" },
  { value: "father", label: "Father" },
  { value: "grandmother", label: "Grandmother" },
  { value: "grandfather", label: "Grandfather" },
  { value: "aunt", label: "Aunt" },
  { value: "uncle", label: "Uncle" },
  { value: "guardian", label: "Guardian" },
  { value: "other", label: "Other" },
];

export const religionOptions = [
  { value: "christianity", label: "Christianity" },
  { value: "islam", label: "Islam" },
  { value: "judaism", label: "Judaism" },
  { value: "hinduism", label: "Hinduism" },
  { value: "buddhism", label: "Buddhism" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export const durationOptions = [
  {
    value: "1day",
    label: "1 Day",
  },
  {
    value: "7days",
    label: "7 Days",
  },
  {
    value: "30days",
    label: "30 Days",
  },
  {
    value: "permanent",
    label: "Permanent",
  },
];
