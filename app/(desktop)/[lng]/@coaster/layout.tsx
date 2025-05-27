import { Metadata } from "next";
import initTranslations from "@/components/translate/i18n";
import { getPageAlternates } from "@/helper/localization";
import PageBaseConfiguration from "@/configuration";


export async function generateMetadata(
  props: { params: Promise<{ lng: string }> }
): Promise<Metadata> {
  const route = "blog";
  const imagePath = "/jumbotron/blog.jpg";

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

export default function MetadataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 