import PageBaseConfiguration from "@/configuration";
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";
import { headers } from "next/headers";

const isValidLocale = (locale: string): boolean => {
  const config = PageBaseConfiguration();
  return (
    locale !== null && locale !== "" && config.supportedLocales.includes(locale)
  );
};

const getPageAlternates = (baseRoute: string): AlternateURLs => {
  const config = PageBaseConfiguration();

  const alternates: AlternateURLs = {
    languages: {},
    canonical: `/${baseRoute}`,
  };

  if (alternates.languages) {
    for (const localeIndex in config.supportedLocales) {
      const locale = config.supportedLocales[localeIndex];

      if (locale == "de" || locale == "en")
        alternates.languages[locale] = `/${locale}/${baseRoute}`;
      else {
        console.log("WARNING! NON SUPPORTED LANGUAGE FOR ALTERNATIVES!!!");
      }
    }
  }

  return alternates;
};

const getLocale = (): string => {
  const config = PageBaseConfiguration();
  const headersList = headers();
  return headersList.get("x-locale") ?? config.defaultLocale;
};

export { isValidLocale, getPageAlternates, getLocale };
