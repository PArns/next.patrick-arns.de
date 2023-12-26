"use client"

import { MouseEvent, useEffect } from "react";
import Image from "next/image";
import ContentfulImageAsset from "@/components/contentful/image-asset";

export default function DesktopIcon({
  icon,
  contentfulIcon,
  name,
  title,
  click,
}: {
  icon?: string;
  contentfulIcon?: any;
  name: string;
  title?: string;
  click: Function;
}) {
  useEffect(() => {
    const init = async () => {
      const { Tooltip, initTE } = await import("tw-elements");
      initTE({ Tooltip });
    };
    init();
  }, []);

  const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    click(window);
  };

  return (
    <button
      className="w-28 h-28 p-1 select-none rounded-md border border-transparent py-2 text-white transition duration-200 ease-in-out hover:border-sky-100 hover:bg-sky-100/50 hover:backdrop-blur-md dark:hover:border-gray-400 dark:hover:bg-gray-800/50"
      data-te-toggle="tooltip"
      title={title}
      onClick={handleMouseEvent}
    >
      <div className="flex justify-center items-center mb-1">
        {icon && (
          <Image
            src={icon}
            width={48}
            height={48}
            alt={name}
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          />
        )}
        {contentfulIcon && (
          <ContentfulImageAsset
            asset={contentfulIcon}
            width={48}
            height={48}
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          />
        )}
      </div>
      <div className="justify-center items-center">
        <p className="text-ellipsis overflow-hidden rop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {name}
        </p>
      </div>
    </button>
  );
}
