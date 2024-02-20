import { headers } from "next/headers";

import {
  TypeBackgroundImagesFields,
  TypeSocialMediaLinkFields,
} from "@/contentful/types";

import Taskbar from "../taskbar";
import TitleBar from "../titlebar";
import IconContainer from "../icon-container";
import WindowManager from "../windowManager";
import BackgroundImage from "../background-image";
import Lightbox from "../lightbox";

import PageBaseConfiguration from "@/configuration";

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
  const config = PageBaseConfiguration();

  const headersList = headers();
  const startRoute = headersList.get("x-url") ?? null;
  const startLocale = headersList.get("x-locale") ?? config.defaultLocale;

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div className="flex-none">
          <TitleBar pageName={pageName} />
        </div>
        <div className="flex flex-grow">
          {children}
          <IconContainer socialMediaLinks={socialMediaLinks} />
        </div>
        <div className="flex-none">
          <Taskbar socialMediaLinks={socialMediaLinks} />
        </div>
      </div>

      <WindowManager startRoute={startRoute} startLocale={startLocale} />
      <Lightbox />
      <BackgroundImage backgroundImages={backgroundImages} />  
    </>
  );
}
