import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, MouseEvent } from "react";

import Window from "./../window";
import Image from "next/image";
import classNames from "classnames";

export default function Dock({
  windowsArray,
  click,
}: {
  windowsArray: any;
  click: Function;
}) {
  if (!Array.isArray(windowsArray)) {
    return <></>;
  }
  const a = Array.from(windowsArray);
  const winArray = a.sort(compare);

  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-gray-700/50 backdrop-blur-md px-4 pb-3"
    >
      {winArray.map((window) => (
        <AppIcon mouseX={mouseX} window={window} click={click} />
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

function AppIcon({
  mouseX,
  window,
  click,
}: {
  mouseX: MotionValue;
  window: Window;
  click: Function;
}) {
  let ref = useRef<HTMLButtonElement>(null);

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

  let activeButton = classNames("inline-flex rounded-full h-1 w-1 shadow-md", {
    "bg-gray-500": !window.state.active,
    "bg-sky-500": window.state.active,
    visible: window.state.visible,
    invisible: !window.state.visible,
  });

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      className="aspect-square w-10"
      title={window.props.title}
      onClick={handleMouseEvent}
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
