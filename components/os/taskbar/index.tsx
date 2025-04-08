import { SocialMediaLink } from "../icon-container";
import Dock from "./dock";

export default function Taskbar({
  socialMediaLinks,
}: {
  socialMediaLinks?: SocialMediaLink[];
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
