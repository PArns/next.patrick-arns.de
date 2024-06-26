"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";

import Image from "next/image";
import clsx from "clsx";
import { WindowDetails, desktopWindowEvents } from "../windowManager/events";
import { makeWindowActiveEvent, addLocaleToRoute } from "../windowManager";

export default function AppIcon({
  mouseX,
  window,
}: {
  mouseX: MotionValue;
  window: WindowDetails;
}) {
  const [currentWindowStatus, setCurrentWindowStatus] =
    useState<WindowDetails>(window);

  let ref = useRef<HTMLAnchorElement>(null);

  desktopWindowEvents.updateWindowDetailsEvent.useOnUpdateWindowDetailsListener(
    (window) => {
      if (window.id === currentWindowStatus.id) {
        setCurrentWindowStatus(window);
      }
    },
  );

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 10 });

  const handleMouseEvent = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    makeWindowActiveEvent.emitOnMakeWindowActiveEvent(currentWindowStatus);
  };

  let activeButton = clsx("inline-flex rounded-full h-1.5 w-1.5 shadow-md", {
    "bg-gray-500 dark:bg-gray-400": !currentWindowStatus.active,
    "bg-sky-500 dark:bg-sky-600": currentWindowStatus.active,
    visible: currentWindowStatus.visible,
    invisible: !currentWindowStatus.visible,
  });

  return (
    <motion.a
      ref={ref}
      style={{ width }}
      className="aspect-square text-center"
      onClick={handleMouseEvent}
      href={addLocaleToRoute(currentWindowStatus.route)}
      data-te-toggle="tooltip"
      title={window.title}
    >
      <div className="flex flex-col">
        <div className="-mt-1">
          <Image
            src={window.icon}
            width={128}
            height={128}
            alt={window.title}
            className="object-contain drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          />
        </div>
        <div className="-mt-1.5 h-1">
          <span className={activeButton}></span>
        </div>
      </div>
    </motion.a>
  );
}
