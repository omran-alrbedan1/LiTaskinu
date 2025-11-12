// form-sections-preference.js
import { BASE_SECTIONS } from "./form-sections-base";

export const PREFERENCE_SECTIONS = [
  {
    ...BASE_SECTIONS[0],
    description: "Your preferred partner's basic details",
  },
  {
    ...BASE_SECTIONS[1],
    description: "Your preferred physical characteristics",
  },
  {
    ...BASE_SECTIONS[2],
    description: "Your preferred lifestyle habits and family preferences",
    fields: BASE_SECTIONS[2].fields.filter((f) => f.key !== "occupation"),
  },
  {
    ...BASE_SECTIONS[3],
    description: "Your preferred educational background",
  },
  {
    ...BASE_SECTIONS[4],
    description: "Your preferred religious and cultural background",
  },
];
