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
        <WindowManager startRoute={startRoute} startLocale={startLocale} />
        <BackgroundImage backgroundImages={backgroundImages} />

        <div className="flex-none">
          <TitleBar pageName={pageName} />
        </div>
        <div className="flex flex-grow">
          <IconContainer socialMediaLinks={socialMediaLinks} />
          {children}
        </div>
        <div className="flex-none">
          <Taskbar socialMediaLinks={socialMediaLinks} />
        </div>
      </div>
      <Lightbox />
    </>
  );
}
