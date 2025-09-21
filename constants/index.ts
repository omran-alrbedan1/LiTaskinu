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
