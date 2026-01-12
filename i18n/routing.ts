import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar", "tr", "es", "fr", "zh", "fa", "ru"],
  defaultLocale: "en",
});
