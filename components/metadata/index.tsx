import PageBaseConfiguration from "@/configuration";
import { getPageAlternates } from "@/helper/localization";
import initTranslations from "../translate/i18n";
import { Metadata } from "next";

export default async function getMetadata(
  props: { params: Promise<{ lng: string }> },
  route: string,
  imagePath?: string,
): Promise<Metadata> {
  const params = await props.params;
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: [route],
  });

  const config = PageBaseConfiguration();
  const alternates = getPageAlternates(route);
  return {
    title: t("title"),
    description: t("subTitle"),
    alternates,
    metadataBase: config.baseUrl,
    openGraph: {
      type: "website",
      locale: params.lng,
      url: `${config.baseUrl}${params.lng}/${route}`,
      siteName: config.title,
      ...(imagePath && { images: imagePath }),
    },
    twitter: {
      card: "summary",
    },
  };
}
