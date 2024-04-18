import PageBaseConfiguration from "@/configuration";

const isValidLocale = (locale: string): boolean => {
  const config = PageBaseConfiguration();
  return (
    locale !== null && locale !== "" && config.supportedLocales.includes(locale)
  );
};

export { isValidLocale };
