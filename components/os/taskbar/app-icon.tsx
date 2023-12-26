"use client";

import {
  MotionValue,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, MouseEvent } from "react";

import Window from "./../window";
import Image from "next/image";
import classNames from "classnames";

export default function AppIcon({
    mouseX,
    window,
    click,
  }: {
    mouseX: MotionValue;
    window: Window;
    click: Function;
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
  
    let activeButton = classNames(
      "inline-flex rounded-full h-1.5 w-1.5 shadow-md",
      {
        "bg-gray-500": !window.state.active,
        "bg-sky-500": window.state.active,
        visible: window.state.visible,
        invisible: !window.state.visible,
      }
    );
  
    return (
      <motion.button
        ref={ref}
        style={{ width }}
        className="aspect-square w-10"
        onClick={handleMouseEvent}
        data-te-toggle="tooltip"
        title={window.state.title}
      >
        <div className="flex flex-col">
          <div className="-mt-3">
            <Image
              src={window.props.icon}
              width={128}
              height={128}
              alt={window.props.title}
              className="object-contain"
            />
          </div>
          <div className="h-1 -mt-2">
            <span className={activeButton}></span>
          </div>
        </div>
      </motion.button>
    );
  }
  