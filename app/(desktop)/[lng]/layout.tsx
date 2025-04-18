import Desktop from "@/components/os/desktop";

import { GetBackgroundImages } from "@/data-provider/contentful/provider/background-image-provider";
import { GetSocialMediaLinks } from "@/data-provider/contentful/provider/social-media-link-provider";

import DesktopWindow from "@/components/os/window";
import PageBaseConfiguration from "@/configuration";
import initTranslations from "@/components/translate/i18n";

export default async function AppLayout(props: {
  coaster: React.ReactNode;
  blog: React.ReactNode;
  welcome: React.ReactNode;
  pictures: React.ReactNode;
  me: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const params = await props.params;

  const { coaster, blog, welcome, pictures, me } = props;

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
        maxWidth={1024}
        route="/welcome"
        title={t("welcome")}
        icon="/appicons/welcome-back.png"
        isInitiallyOpen={true}
        id="welcome"
      >
        {welcome}
      </DesktopWindow>

      <DesktopWindow
        width="70%"
        maxWidth={1600}
        route="/me"
        title={t("aboutMe")}
        icon="/appicons/ausweis.png"
        id="me"
      >
        {me}
      </DesktopWindow>

      <DesktopWindow
        width="80%"
        height="95%"
        maxWidth={1600}
        route="/blog"
        title="Blog"
        icon="/appicons/blog.png"
        id="blog"
      >
        {blog}
      </DesktopWindow>

      <DesktopWindow
        width="80%"
        height="95%"
        maxWidth={1600}
        route="/pictures"
        title={t("pictures")}
        icon="/appicons/picture.png"
        id="pictures"
      >
        {pictures}
      </DesktopWindow>

      <DesktopWindow
        width="80%"
        height="95%"
        maxWidth={1600}
        route="/coaster"
        title={t("coaster")}
        icon="/appicons/coaster.png"
        id="coaster"
      >
        {coaster}
      </DesktopWindow>
    </Desktop>
  );
}
