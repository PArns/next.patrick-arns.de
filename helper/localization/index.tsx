import PageBaseConfiguration from "@/configuration";
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";
import { headers } from "next/headers";

const isValidLocale = (locale: string): boolean => {
  const config = PageBaseConfiguration();
  return (
    locale !== null && locale !== "" && config.supportedLocales.includes(locale)
  );
};

const getPageAlternates = (baseRoute: string, lng: string): AlternateURLs => {
  const config = PageBaseConfiguration();

  // Self-referencing canonical: the unprefixed route only 301-redirects, and
  // hreflang annotations are ignored when the canonical points elsewhere.
  const alternates: AlternateURLs = {
    languages: {},
    canonical: `/${lng}/${baseRoute}`,
  };

  if (alternates.languages) {
    for (const locale of config.supportedLocales) {
      if (locale == "de" || locale == "en")
        alternates.languages[locale] = `/${locale}/${baseRoute}`;
      else {
        console.log("WARNING! NON SUPPORTED LANGUAGE FOR ALTERNATIVES!!!");
      }
    }
  }

  return alternates;
};

const getLocale = async (): Promise<string> => {
  const config = PageBaseConfiguration();
  const headersList = await headers();
  return headersList.get("x-locale") ?? config.defaultLocale;
};

export { isValidLocale, getPageAlternates, getLocale };
