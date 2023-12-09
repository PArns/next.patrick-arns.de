import Desktop from "@/components/os/desktop";

import UnderConstruction from "../_apps/underconstruction";
import Blog from "../_apps/blog";

import { GetBackgroundImages } from "@/api/provider/background-image-provider";

export default async function AppLayout() {
  const backgroundImages = await GetBackgroundImages();
  return (
    <Desktop backgroundImages={backgroundImages} pageName="Patrick-Arns.de">
      <Blog />
      <UnderConstruction />
    </Desktop>
  );
}
