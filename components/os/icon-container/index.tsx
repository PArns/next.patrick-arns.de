"use client";

import React, { useState } from "react";
import DesktopIcon from "./desktop-icon";

import {
  registeredWindowsChangedEvent,
  makeWindowActiveEvent,
  RegisteredWindows,
  getCurrentLocale,
} from "../windowManager";
import clsx from "clsx";

export type SocialMediaLink = {
  name: string;
  title: string;
  link: string;
  icon?: string;
};

export type IconContainerContract = {
  socialMediaLinks?: SocialMediaLink[];
};

const IconContainer: React.FC<IconContainerContract> = ({
  socialMediaLinks,
}) => {
  const [windowArray, setWindowArray] = useState<RegisteredWindows>([]);
  const currentLocale = getCurrentLocale();

  registeredWindowsChangedEvent.useOnRegisteredWindowsChangedEventListener(
    (newWindowArray) => {
      setWindowArray(newWindowArray);
    },
  );

  const mainIconDivClasses = clsx(
    "absolute m-4 flex h-screen flex-row flex-wrap content-start gap-2 pb-16 transition-opacity",
    {
      "opacity-0": windowArray.length === 0,
    },
  );

  return (
    <nav className={mainIconDivClasses} aria-label="Desktop Icons">
      <div className="flex h-screen flex-col flex-wrap content-start gap-2 pb-16">
        {windowArray.map((window) => (
          <DesktopIcon
            icon={window.icon}
            name={window.title}
            key={window.id}
            href={`/${currentLocale}${window.startRoute}`}
            click={() => {
              makeWindowActiveEvent.emitOnMakeWindowActiveEvent(window);
            }}
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
