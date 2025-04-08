"use client";

import { useState } from "react";

import { activeWindowChangedEvent } from "../windowManager";

import Clock from "../clock";
import Image from "next/image";
import { WindowDetails } from "../windowManager/events";
import LanguageSwitcher from "../language-switcher";
import ThemeSwitcher from "../theme-switch";

const defaultIcon = "/favicons/favicon-32x32.png";

export default function TitleBar({ pageName }: { pageName: string }) {
  const [title, setTitle] = useState<string>(pageName);
  const [spacer, setSpacer] = useState<string>(" - ");

  const [appIcon, setAppIcon] = useState<string>(defaultIcon);

  activeWindowChangedEvent.useOnActiveWindowChangedEventListener(
    (window: WindowDetails | null) => {
      if (window) {
        setTitle(window.title);
        setSpacer(" - ");
        setAppIcon(window.icon);
      } else {
        setTitle("");
        setSpacer("");
        setAppIcon(defaultIcon);
      }
    },
  );

  return (
    <div className="flex flex-row bg-white/50 px-1 drop-shadow-sm backdrop-blur-lg dark:bg-neutral-800/50">
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
          <div className="w-96 truncate pt-[1px] md:w-auto md:max-w-[500px] lg:max-w-none">
            <span className="hidden md:inline" aria-hidden="true">
              {pageName}
            </span>
            <span className="hidden md:inline" aria-hidden="true">
              {spacer}
            </span>
            <span>{title}</span>
          </div>
        </div>
      </div>
      <div className="grow"></div>
      <div
        className="hidden flex-none pt-[1px] pr-2 md:block"
        aria-hidden="true"
      >
        <Clock timeFormat="hh-mm" />
      </div>
      <div className="flex-none" aria-hidden="true">
        <ThemeSwitcher />
      </div>
      <div className="flex-none">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
