"use client";

import { useState } from "react";
import Image from "next/image";
import { WindowDetails } from "@/components/os/windowManager/events";
import { activeWindowChangedEvent } from "@/components/os/windowManager";

const defaultIcon = "/favicons/favicon-32x32.png";

export default function ActiveAppBar({ pageName }: { pageName: string }) {
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
    <>
      <div>
        <Image
          src={appIcon}
          alt={title}
          width={20}
          height={20}
          priority={true}
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
    </>
  );
}
