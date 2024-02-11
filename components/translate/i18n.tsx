import { createInstance, i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";

import PageBaseConfiguration from "@/configuration";

export default async function initTranslations({
  locale,
  namespaces,
  i18nInstance,
  resources,
}: {
  locale: string;
  namespaces: string[];
  i18nInstance?: i18n;
  resources?: any;
}) {
  const config = PageBaseConfiguration();
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/i18n/locales/${language}/${namespace}.json`),
      ),
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: config.defaultLocale,
    supportedLngs: config.supportedLocales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : config.supportedLocales,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
