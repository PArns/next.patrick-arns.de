"use client";

import { MouseEvent, useEffect } from "react";
import Image from "next/image";
import ContentfulImageAsset from "@/components/contentful/image-asset";

import Link from "next/link";
import { EntryFieldTypes } from "contentful/dist/types/types/entry";

export default function DesktopIcon({
  icon,
  contentfulIcon,
  name,
  title,
  href,
  click,
}: {
  icon?: string;
  contentfulIcon?: any;
  name?: string | EntryFieldTypes.Symbol;
  title?: string | EntryFieldTypes.Symbol;
  href?: string | EntryFieldTypes.Symbol;
  click?: Function;
}) {
  useEffect(() => {
    const init = async () => {
      const { Tooltip, initTE } = await import("tw-elements");
      initTE({ Tooltip });
    };
    init();
  }, []);

  const handleMouseEvent = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (click) {
      click();
    } else if (href) {
      window.open(href.toString(), "_blank");
    }
  };

  return (
    <Link
      className="text-center align-middle w-28 h-22 p-1 select-none rounded-md border border-transparent py-2 text-white transition duration-200 ease-in-out hover:border-sky-100 hover:bg-sky-100/50 hover:backdrop-blur-md dark:hover:border-gray-400 dark:hover:bg-gray-800/50"
      data-te-toggle="tooltip"
      title={title?.toString()}
      href={`${href}`}
      onClick={handleMouseEvent}
    >
      <div className="flex justify-center items-center mb-1">
        {icon && (
          <Image
            src={icon}
            width={48}
            height={48}
            alt={name?.toString() as string}
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          />
        )}
        {contentfulIcon && (
          <ContentfulImageAsset
            asset={contentfulIcon}
            width={48}
            height={48}
            alt={name || "Icon"}
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          />
        )}
      </div>
      <div className="justify-center items-center">
        <p className="text-ellipsis overflow-hidden rop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {name?.toString()}
        </p>
      </div>
    </Link>
  );
}
