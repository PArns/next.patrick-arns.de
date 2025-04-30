"use client";

import { motion, useMotionValue } from "framer-motion";

import AppIcon from "./app-icon";
import SocialMediaIcon from "./social-media-icon";
import {
  RegisteredWindows,
  registeredWindowsChangedEvent,
} from "../windowManager";
import { useState } from "react";

import { isMobile } from "react-device-detect";
import clsx from "clsx";
import { SocialMediaLink } from "../icon-container";

export default function Dock({
  socialMediaLinks,
}: {
  socialMediaLinks?: SocialMediaLink[];
}) {
  let mouseX = useMotionValue(Infinity);
  const [windowsArray, setWindowsArray] = useState<RegisteredWindows>([]);

  registeredWindowsChangedEvent.useOnRegisteredWindowsChangedEventListener(
    (newWindowArray) => {
      setWindowsArray(newWindowArray);
    },
  );

  const mainDivClasses = clsx(
    "mx-auto flex h-16 items-end rounded-2xl bg-white/50 px-2.5 pb-3 backdrop-blur-md transition-transform dark:bg-neutral-700/50 gap-3 border border-neutral-400 dark:border-neutral-600",
    {
      "translate-y-16": windowsArray.length == 0,
    },
  );

  return (
    <motion.div
      onMouseMove={(e) => {
        if (!isMobile) mouseX.set(e.pageX);
      }}
      onMouseLeave={() => {
        if (!isMobile) mouseX.set(Infinity);
      }}
      className={mainDivClasses}
    >
      {windowsArray.map((window) => (
        <AppIcon mouseX={mouseX} window={window} key={window.id} />
      ))}

      {socialMediaLinks && socialMediaLinks.length && (
        <div className="-m-1.5 mx-[0px] hidden h-full w-[1px] bg-neutral-400 md:block dark:bg-neutral-600" />
      )}

      {socialMediaLinks &&
        socialMediaLinks.length &&
        socialMediaLinks.map((link) => (
          <SocialMediaIcon
            mouseX={mouseX}
            contentfulAsset={link.icon}
            href={link.link}
            name={link.name}
            key={link.name?.toString() as string}
            className="hidden md:block"
          />
        ))}
    </motion.div>
  );
}
