import Desktop from "@/components/os/desktop";

import UnderConstruction from "../_apps/underconstruction";
import Blog from "../_apps/blog";

import { GetBackgroundImages } from "@/api/provider/background-image-provider";
import { GetSocialMediaLinks } from "@/api/provider/social-media-link-provider";

export default async function AppLayout() {
  const backgroundImages = await GetBackgroundImages();
  const socialMediaLinks = await GetSocialMediaLinks();

  return (
    <Desktop
      backgroundImages={backgroundImages}
      socialMediaLinks={socialMediaLinks}
      pageName="Patrick-Arns.de"
    >
      <Blog />
      <UnderConstruction />
    </Desktop>
  );
}
