import { BASE_SECTIONS } from "./form-sections-base";

export const PROFILE_SECTIONS = BASE_SECTIONS.map((section) => {
  if (section.id === "lifestyle") {
    return {
      ...section,
      fields: [
        ...section.fields,
        { key: "occupation", label: "Occupation", type: "text" },
        {
          key: "healthCondation",
          label: "If you have a health condation , please write it down",
          type: "text",
        },
        {
          key: "numberOfChildren",
          label: "Number Of Children",
          type: "number",
        },
      ],
    };
  }
});
