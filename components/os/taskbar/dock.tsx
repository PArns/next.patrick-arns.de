"use client";

import { motion, useMotionValue } from "framer-motion";
import { TypeSocialMediaLinkFields } from "@/contentful/types";

import AppIcon from "./app-icon";
import SocialMediaIcon from "./social-media-icon";
import {
  RegisteredWindows,
  registeredWindowsChangedEvent,
} from "../windowManager";
import { useState } from "react";

import { isMobile } from "react-device-detect";

export default function Dock({
  socialMediaLinks,
}: {
  socialMediaLinks?: TypeSocialMediaLinkFields[];
}) {
  let mouseX = useMotionValue(Infinity);

  const [windowsArray, setWindowsArray] = useState<RegisteredWindows>([]);

  registeredWindowsChangedEvent.useOnRegisteredWindowsChangedEventListener(
    (newWindowArray) => {
      setWindowsArray(newWindowArray);
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
      className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-white/50 px-4 pb-3 backdrop-blur-md dark:bg-neutral-800/50"
    >
      {windowsArray.map((window) => (
        <AppIcon mouseX={mouseX} window={window} key={window.id} />
      ))}

      {socialMediaLinks && socialMediaLinks.length && (
        <div className="-m-2 mx-[0px] hidden h-full w-[1px] bg-slate-500 md:block" />
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
