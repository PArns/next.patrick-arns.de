"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, MouseEvent } from "react";
import { title } from "process";

import ContentfulImageAsset from "@/components/contentful/image-asset";
import { EntryFieldTypes } from "contentful/dist/types/types/entry";

export default function SocialMediaIcon({
  mouseX,
  click,
  href,
  name,
  contentfulAsset,
}: {
  mouseX: MotionValue;
  click?: Function;
  href?: string | EntryFieldTypes.Symbol;
  name?: string | EntryFieldTypes.Symbol;
  contentfulAsset: any;
}) {
  let ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const init = async () => {
      const { Tooltip, initTE } = await import("tw-elements");
      initTE({ Tooltip });
    };
    init();
  }, []);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleMouseEvent = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (click) {
      click();
    } else if (href) {
      window.open(href.toString(), "_blank");
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href?.toString()}
      style={{ width }}
      className="aspect-square w-10"
      onClick={handleMouseEvent}
      data-te-toggle="tooltip"
      title={name?.toString()}
    >
      <div className="flex flex-col">
        <div>
          <ContentfulImageAsset
            asset={contentfulAsset}
            width={128}
            height={128}
            alt={title}
            className="object-contain"
          />
        </div>
      </div>
    </motion.a>
  );
}
