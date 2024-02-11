import initTranslations from "./i18n";

export default async function Translate({
  locale,
  ns,
  id,
}: {
  locale: string;
  ns: string;
  id: string;
}) {
  const { t } = await initTranslations({
    locale: locale,
    namespaces: [ns],
  });

  return <>{t(id)}</>;
}
