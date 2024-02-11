import Desktop from "@/components/os/desktop";

import { GetBackgroundImages } from "@/contentful/provider/background-image-provider";
import { GetSocialMediaLinks } from "@/contentful/provider/social-media-link-provider";

import DesktopWindow from "@/components/os/window";
import PageBaseConfiguration from "@/configuration";

export default async function AppLayout({
  blog,
  underconstruction,
}: {
  blog: React.ReactNode;
  underconstruction: React.ReactNode;
}) {
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
        width="50%"
        height="50%"
        route="/underconstruction"
        title="Under Construction"
        icon="/appicons/bulldozer.png"
        isInitiallyOpen={true}
        id="underconstruction"
      >
        {underconstruction}
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
