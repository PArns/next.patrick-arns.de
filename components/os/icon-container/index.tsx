"use client";

import React, { useState } from "react";
import DesktopIcon from "./desktop-icon";
import { TypeSocialMediaLinkFields } from "@/api/types";

import {
  registeredWindowsChangedEvent,
  makeWindowActiveEvent,
  RegisteredWindows,
} from "../windowManager";

export type IconContainerContract = {
  socialMediaLinks?: TypeSocialMediaLinkFields[];
};

const IconContainer: React.FC<IconContainerContract> = ({
  socialMediaLinks,
}) => {
  const [windowArray, setWindowArray] = useState<RegisteredWindows>([]);

  registeredWindowsChangedEvent.useOnRegisteredWindowsChangedEventListener(
    (newWindowArray) => {
      setWindowArray(newWindowArray);
    }
  );

  return (
    <div className="flex h-screen pb-16 absolute flex-col flex-wrap content-start m-4 gap-2">
      {windowArray.map((window) => (
        <DesktopIcon
          icon={window.icon}
          name={window.title}
          key={window.id}
          href={window.route}
          click={() => {
            makeWindowActiveEvent.emitOnMakeWindowActiveEvent(window);
          }}
        />
      ))}

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
  );
};

export default IconContainer;
