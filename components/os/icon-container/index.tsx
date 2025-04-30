import React from "react";
import DesktopIcon from "./desktop-icon";
import { DesktopWindowConfig } from "@/configuration";

export type SocialMediaLink = {
  name: string;
  title: string;
  link: string;
  icon?: string;
};

export type IconContainerContract = {
  socialMediaLinks?: SocialMediaLink[];
  desktopWindows: DesktopWindowConfig[];
  locale: string;
};

const IconContainer: React.FC<IconContainerContract> = ({
  socialMediaLinks,
  desktopWindows,
  locale,
}) => {
  return (
    <nav
      className="absolute m-4 flex h-screen flex-row flex-wrap content-start gap-2 pb-16"
      aria-label="Desktop Icons"
    >
      <div className="flex h-screen flex-col flex-wrap content-start gap-2 pb-16">
        {desktopWindows &&
          desktopWindows.map((window) => (
            <DesktopIcon
              icon={window.icon}
              name={window.title}
              key={window.key}
              href={`/${locale}${window.route}`}
              windowKey={window.key}
            />
          ))}
      </div>
      <div className="flex h-screen flex-col flex-wrap content-start gap-2 pb-16">
        {socialMediaLinks &&
          socialMediaLinks.map((link) => (
            <DesktopIcon
              contentfulIcon={link.icon}
              name={link.name}
              title={link.title}
              key={link.name?.toString() as string}
              href={link.link}
            />
          ))}
      </div>
    </nav>
  );
};

export default IconContainer;
