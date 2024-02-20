import Desktop from "@/components/os/desktop";

import { GetBackgroundImages } from "@/contentful/provider/background-image-provider";
import { GetSocialMediaLinks } from "@/contentful/provider/social-media-link-provider";

import DesktopWindow from "@/components/os/window";
import PageBaseConfiguration from "@/configuration";
import initTranslations from "@/components/translate/i18n";

export default async function AppLayout({
  blog,
  welcome,
  params,
}: {
  blog: React.ReactNode;
  welcome: React.ReactNode;
  params: { lng: string };
}) {
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["titles"],
  });

  const config = PageBaseConfiguration();
  const backgroundImages = await GetBackgroundImages();
  const socialMediaLinks = await GetSocialMediaLinks();

  return (
    <Desktop
      backgroundImages={backgroundImages}
      socialMediaLinks={socialMediaLinks}
      pageName={config.title}
    >
      <DesktopWindow
        width="70%"
        height="70%"
        route="/welcome"
        title={t("welcome")}
        icon="/appicons/welcome-back.png"
        isInitiallyOpen={true}
        id="welcome"
      >
        {welcome}
      </DesktopWindow>

      <DesktopWindow
        width="80%"
        height="80%"
        maxWidth={1600}
        route="/blog"
        title="Blog"
        icon="/appicons/blog.png"
        id="blog"
      >
        {blog}
      </DesktopWindow>
    </Desktop>
  );
}
