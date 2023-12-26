"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, MouseEvent } from "react";
import { title } from "process";

import ContentfulImageAsset from "@/components/contentful/image-asset";

export default function SocialMediaIcon({
  mouseX,
  click,
  name,
  contentfulAsset,
}: {
  mouseX: MotionValue;
  click: Function;
  name: string;
  contentfulAsset: any;
}) {
  let ref = useRef<HTMLButtonElement>(null);

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

  const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    click(window);
  };

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      className="aspect-square w-10"
      onClick={handleMouseEvent}
      data-te-toggle="tooltip"
      title={name}
    >
      <div className="flex flex-col">
        <div className="-mt-3">
          <ContentfulImageAsset
            asset={contentfulAsset}
            width={128}
            height={128}
            alt={title}
            className="object-contain"
          />
        </div>
        <div className="h-1 -mt-2"></div>
      </div>
    </motion.button>
  );
}
