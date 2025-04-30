"use client";

import { MouseEvent } from "react";
import Image from "next/image";
import ContentfulImageAsset from "@/components/contentful/image-asset";
import { makeWindowActiveEvent } from "../windowManager";

import Link from "next/link";
import { SlotProps } from "@/configuration";

export default function DesktopIcon({
  icon,
  contentfulIcon,
  name,
  title,
  href,
  windowKey,
}: {
  icon?: string;
  contentfulIcon?: any;
  name?: string;
  title?: string;
  href?: string;
  windowKey?: keyof SlotProps;
}) {
  const handleMouseEvent = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (windowKey) {
      makeWindowActiveEvent.emitOnMakeWindowActiveEvent(windowKey);
    } else if (href) {
      window.open(href.toString(), "_blank");
    }
  };

  return (
    <Link
      className="w-28 rounded-md border border-transparent p-1 py-2 text-center align-middle text-white transition duration-200 ease-in-out select-none hover:border-sky-400 hover:bg-sky-100/50 hover:backdrop-blur-md dark:hover:border-sky-600 dark:hover:bg-neutral-800/50"
      data-te-toggle="tooltip"
      title={title?.toString()}
      href={`${href}`}
      onClick={handleMouseEvent}
    >
      <div className="mb-1 flex h-12 items-center justify-center">
        {icon && (
          <Image
            src={icon}
            width={48}
            height={48}
            priority={true}
            alt={name?.toString() as string}
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          />
        )}
        {contentfulIcon && (
          <ContentfulImageAsset
            asset={contentfulIcon}
            width={48}
            height={48}
            priority={true}
            alt={name || "Icon"}
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          />
        )}
      </div>
      <div className="items-end justify-center">
        <p className="overflow-hidden text-ellipsis drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {name?.toString()}
        </p>
      </div>
    </Link>
  );
}
