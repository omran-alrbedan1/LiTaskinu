import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar", "it", "de", "es", "ru", "zh"],
  defaultLocale: "en",
});
