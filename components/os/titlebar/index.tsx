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
    }
  );

  return (
    <div className="backdrop-blur-lg bg-white/50 flex flex-row px-2 drop-shadow">
      <div className="flex-none">
        <div className="flex flex-row">
          <div>
            <Image
              src={appIcon}
              alt={title}
              width={20}
              height={20}
              className="pt-1 pr-1 drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]"
            />
          </div>
          <div>{title}</div>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex-none px-2">
        <LanguageSwitcher />
      </div>
      <div className="flex-none">
        <Clock timeFormat="hh-mm" />
      </div>
    </div>
  );
}
