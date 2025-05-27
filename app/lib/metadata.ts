import { Metadata } from "next";
import initTranslations from "@/components/translate/i18n";
import { getPageAlternates } from "@/helper/localization";
import PageBaseConfiguration from "@/configuration";

export async function generateMetadata(
  props: { params: Promise<{ lng: string }> },
  route: string,
  namespace: string,
  imagePath?: string,
  ogType: "website" | "article" = "website"
): Promise<Metadata> {
  const params = await props.params;
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: [namespace],
  });
  const config = PageBaseConfiguration();
  const alternates = getPageAlternates(route);
  return {
    title: t("title"),
    description: t("subTitle"),
    alternates,
    metadataBase: config.baseUrl,
    openGraph: {
      type: ogType,
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