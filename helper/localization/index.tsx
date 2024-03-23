import { headers } from "next/headers";
import PageBaseConfiguration from "@/configuration";

const getCurrentRoute = () => {
  const config = PageBaseConfiguration();

  const headersList = headers();
  return headersList.get("x-url") ?? "";
};

const getCurrentLocale = () => {
  const config = PageBaseConfiguration();

  const headersList = headers();
  return headersList.get("x-locale") ?? config.defaultLocale;
};

const removeLocaleFromRoute = (
  routeToRemoveLocaleFrom: string,
  localeToBeRemoved?: string,
): string => {
  if (!Boolean(localeToBeRemoved)) localeToBeRemoved = getCurrentLocale();

  if (
    routeToRemoveLocaleFrom === `/${localeToBeRemoved}` ||
    routeToRemoveLocaleFrom === `/${localeToBeRemoved}/`
  )
    return "/";

  if (!routeToRemoveLocaleFrom.startsWith(`/${localeToBeRemoved}`))
    return routeToRemoveLocaleFrom;

  return routeToRemoveLocaleFrom.substring(`/${localeToBeRemoved}`.length);
};

const addLocaleToRoute = (
  routeToAddLocaleTo: string,
  localeToBeAdded?: string,
): string => {
  if (!Boolean(localeToBeAdded)) localeToBeAdded = getCurrentLocale();

  const removedLocale = removeLocaleFromRoute(
    routeToAddLocaleTo,
    localeToBeAdded,
  );

  return `/${localeToBeAdded}${removedLocale}`;
};

const isValidLocale = (locale: string): boolean => {
  const config = PageBaseConfiguration();
  return config.supportedLocales.includes(locale);
};

export {
  getCurrentRoute,
  getCurrentLocale,
  removeLocaleFromRoute,
  addLocaleToRoute,
  isValidLocale
};
