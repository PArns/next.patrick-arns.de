"use client";

import { motion, useMotionValue } from "framer-motion";

import Window from "./../window";

import { TypeSocialMediaLinkFields } from "@/api/types";

import AppIcon from "./app-icon";
import SocialMediaIcon from "./social-media-icon";

export default function Dock({
  windowsArray,
  click,
  socialMediaLinks,
}: {
  windowsArray: any;
  click: Function;
  socialMediaLinks?: TypeSocialMediaLinkFields[];
}) {
  let winArray: Window[] = [];

  if (Array.isArray(windowsArray)) {
    const a = Array.from(windowsArray);
    winArray = a.sort(compare);
  }

  let socialMediaLinkArray: TypeSocialMediaLinkFields[] = [];

  if (Array.isArray(socialMediaLinks)) {
    const a = Array.from(socialMediaLinks);
    socialMediaLinkArray = a.sort(socialMediaLinkCompare);
  }

  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-gray-700/50 backdrop-blur-md px-4 pb-3"
    >
      {winArray.map((window) => (
        <AppIcon
          mouseX={mouseX}
          window={window}
          click={click}
          key={window.props.title}
        />
      ))}

      {socialMediaLinkArray.length && (
        <div className="mx-[0px] w-[1px] h-full bg-slate-500 -m-2"></div>
      )}

      {socialMediaLinkArray.map((link) => (
        <SocialMediaIcon
          mouseX={mouseX}
          contentfulAsset={link.icon}
          href={link.link?.toString() as string}
          name={link.name?.toString() as string}
          key={link.name?.toString() as string}
        />
      ))}
    </motion.div>
  );
}

function compare(a: Window, b: Window) {
  if (a.props.sortIndex < b.props.sortIndex) {
    return -1;
  }
  if (a.props.sortIndex > b.props.sortIndex) {
    return 1;
  }
  return 0;
}

function socialMediaLinkCompare(
  a: TypeSocialMediaLinkFields,
  b: TypeSocialMediaLinkFields
) {
  if (a.order && b.order && a.order < b.order) {
    return -1;
  }
  if (a.order && b.order && a.order > b.order) {
    return 1;
  }
  return 0;
}
