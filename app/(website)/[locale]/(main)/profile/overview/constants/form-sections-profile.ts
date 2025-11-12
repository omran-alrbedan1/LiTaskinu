import { BASE_SECTIONS } from "./form-sections-base";

export const PROFILE_SECTIONS = BASE_SECTIONS.map((section) => {
  if (section.id === "lifestyle") {
    return {
      ...section,
      fields: [
        ...section.fields,
        { key: "occupation", label: "Occupation", type: "text" },
      ],
    };
  }
  return section;
});
