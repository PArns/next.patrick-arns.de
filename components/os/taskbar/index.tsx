import Dock from "./dock";
import { TypeSocialMediaLinkFields } from "@/data-provider/contentful/types";

export default function Taskbar({
  socialMediaLinks,
}: {
  socialMediaLinks?: TypeSocialMediaLinkFields[];
}) {
  return (
    <div className="flex h-16">
      <div className="flex grow"></div>
      <div>
        <Dock socialMediaLinks={socialMediaLinks} />
      </div>
      <div className="flex grow"></div>
    </div>
  );
}
