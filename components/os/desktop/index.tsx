import { headers } from "next/headers";

import {
  TypeBackgroundImagesFields,
  TypeSocialMediaLinkFields,
} from "@/api/types";

import Taskbar from "../taskbar";
import TitleBar from "../titlebar";
import IconContainer from "../icon-container";
import WindowManager from "../windowManager";
import BackgroundImage from "../background-image";

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
  const headersList = headers();
  const startRoute = headersList.get("x-url")?? null;

  return (
    <div className="w-screen h-screen flex flex-col">
      <WindowManager startRoute={startRoute} />
      <BackgroundImage backgroundImages={backgroundImages} />

      <div className="flex-none">
        <TitleBar pageName={pageName} />
      </div>
      <div className="flex-grow flex">
        <IconContainer socialMediaLinks={socialMediaLinks} />
        {children}
      </div>
      <div className="flex-none">
        <Taskbar socialMediaLinks={socialMediaLinks} />
      </div>
    </div>
  );
}
