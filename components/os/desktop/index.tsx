import {
  TypeBackgroundImagesFields,
  TypeSocialMediaLinkFields,
} from "@/data-provider/contentful/types";

import Taskbar from "../taskbar";
import TitleBar from "../titlebar";
import IconContainer from "../icon-container";
import WindowManager from "../windowManager";
import BackgroundImage from "../background-image";
import Lightbox from "../lightbox";

export default function Desktop({
  children,
  backgroundImages,
  socialMediaLinks,
  pageName,
}: {
  children: React.ReactNode;
  backgroundImages: TypeBackgroundImagesFields[];
  socialMediaLinks?: TypeSocialMediaLinkFields[];
  pageName: string;
}) {
  return (
    <>
      <div className="fixed inset-0 flex flex-col">
        <div className="z-999 flex-none select-none">
          <TitleBar pageName={pageName} />
        </div>
        <div className="flex grow">
          {children}
          <IconContainer socialMediaLinks={socialMediaLinks} />
        </div>
        <div className="z-999 flex-none select-none">
          <Taskbar socialMediaLinks={socialMediaLinks} />
        </div>
      </div>

      <WindowManager />
      <Lightbox />
      <BackgroundImage backgroundImages={backgroundImages} />
    </>
  );
}
