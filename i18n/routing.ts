import { defineRouting } from "next-intl/routing";

export const LOCALES = ["en", "ar", "tr", "es", "fr", "zh", "fa", "ru"] as const;
export type AppLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

export const SESSION_COOKIES = {
  ADMIN: "admin_session",
  USER: "user_session",
} as const;

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
