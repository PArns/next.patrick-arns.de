import Desktop from "@/components/os/desktop";

import { GetBackgroundImages } from "@/api/provider/background-image-provider";
import { GetSocialMediaLinks } from "@/api/provider/social-media-link-provider";

import Window from "@/components/os/window";
import DynamicWindow from "@/components/os/window/dynamic";

export default async function AppLayout({
  blog,
  underconstruction,
}: {
  blog: React.ReactNode;
  underconstruction: React.ReactNode;
}) {
  const backgroundImages = await GetBackgroundImages();
  const socialMediaLinks = await GetSocialMediaLinks();

  return (
    <Desktop
      backgroundImages={backgroundImages}
      socialMediaLinks={socialMediaLinks}
      pageName="Patrick-Arns.de"
    >
      <DynamicWindow
        sortIndex={0}
        width="50%"
        height="50%"
        route="/underconstruction"
        title="Under Construction"
        icon="/appicons/bulldozer.png"
        isInitiallyOpen={true}
        key={"underconstruction"}
      >
        {underconstruction}
      </DynamicWindow>

      <DynamicWindow
        sortIndex={1}
        width="50%"
        height="50%"
        route="/blog"
        title="Blog"
        icon="/appicons/blog.png"
        key={"blog"}
      >
        {blog}
      </DynamicWindow>
    </Desktop>
  );
}
