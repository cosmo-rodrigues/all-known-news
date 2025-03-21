import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['de', 'en', 'pt'],

  // Used when no locale matches
  defaultLocale: "en",
  pathnames: {
    "/contact": {
      de: "/kontaktiere-mich",
      en: "/contact-me",
      pt: "/contacte-me",
    },
  },
});