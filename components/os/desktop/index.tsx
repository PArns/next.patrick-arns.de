import Taskbar from "../taskbar";
import TitleBar from "../titlebar";
import IconContainer, { SocialMediaLink } from "../icon-container";
import WindowManager from "../windowManager";
import BackgroundImage, { BackgroundImageData } from "../background-image";
import Lightbox from "../lightbox";
import BuildInfo from "../build-number";
import { DesktopWindowConfig } from "@/configuration";

export default function Desktop({
  children,
  backgroundImages,
  socialMediaLinks,
  desktopWindows,
  pageName,
  locale,
}: {
  children: React.ReactNode;
  backgroundImages: BackgroundImageData[];
  socialMediaLinks?: SocialMediaLink[];
  desktopWindows: DesktopWindowConfig[];
  pageName: string;
  locale: string;
}) {
  return (
    <>
      <div className="fixed inset-0 flex flex-col">
        <header className="z-999 flex-none select-none">
          <TitleBar pageName={pageName} />
        </header>
        <div className="flex grow">
          {children}
          <IconContainer
            socialMediaLinks={socialMediaLinks}
            desktopWindows={desktopWindows}
            locale={locale}
          />
        </div>
        <nav className="z-999 flex-none select-none" aria-label="Taskbar">
          <Taskbar socialMediaLinks={socialMediaLinks} />
        </nav>

        <aside className="absolute right-0 bottom-0 p-2">
          <BuildInfo />
        </aside>
      </div>

      <WindowManager />
      <Lightbox />

      <BackgroundImage backgroundImages={backgroundImages} />
    </>
  );
}
