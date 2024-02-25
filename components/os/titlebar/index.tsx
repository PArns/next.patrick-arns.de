"use client";

import { useState } from "react";

import { activeWindowChangedEvent } from "../windowManager";

import Clock from "../clock";
import Image from "next/image";
import { WindowDetails } from "../windowManager/events";
import LanguageSwitcher from "../language-switcher";

const defaultIcon = "/favicons/favicon-32x32.png";

export default function TitleBar({ pageName }: { pageName: string }) {
  const [title, setTitle] = useState<string>(pageName);
  const [appIcon, setAppIcon] = useState<string>(defaultIcon);

  activeWindowChangedEvent.useOnActiveWindowChangedEventListener(
    (window: WindowDetails | null) => {
      if (window) {
        setTitle(pageName + " - " + window.title);
        setAppIcon(window.icon);
      } else {
        setTitle(pageName);
        setAppIcon(defaultIcon);
      }
    },
  );

  return (
    <div className="flex flex-row bg-white/50 px-2 drop-shadow backdrop-blur-lg">
      <div className="w-max flex-none">
        <div className="flex flex-row">
          <div>
            <Image
              src={appIcon}
              alt={title}
              width={20}
              height={20}
              className="pr-1 pt-1 drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]"
            />
          </div>
          <div className="truncate w-60 md:w-auto">{title}</div>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="collapse flex-none pr-2 md:visible">
        <Clock timeFormat="hh-mm" />
      </div>
      <div className="flex-none">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
