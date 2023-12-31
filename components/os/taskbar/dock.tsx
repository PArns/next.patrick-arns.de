"use client";

import { motion, useMotionValue } from "framer-motion";
import { TypeSocialMediaLinkFields } from "@/api/types";

import AppIcon from "./app-icon";
import SocialMediaIcon from "./social-media-icon";
import {
  RegisteredWindows,
  registeredWindowsChangedEvent,
} from "../windowManager";
import { useState } from "react";

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
    }
  );

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-gray-700/50 backdrop-blur-md px-4 pb-3"
    >
      {windowsArray.map((window) => (
        <AppIcon
          mouseX={mouseX}
          window={window}
          key={window.id}
        />
      ))}

      {socialMediaLinks && socialMediaLinks.length && (
        <div className="mx-[0px] w-[1px] h-full bg-slate-500 -m-2"></div>
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
          />
        ))}
    </motion.div>
  );
}
