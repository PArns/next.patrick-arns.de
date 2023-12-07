import Desktop from "@/components/os/desktop";

import UnderConstruction from "../_apps/underconstruction";
import Blog from "../_apps/blog";

export default function AppLayout() {
  return (
    <Desktop>
      <Blog />
      <UnderConstruction />
    </Desktop>
  );
}
