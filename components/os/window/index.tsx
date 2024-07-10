"use client";

import React, { useEffect, useCallback, useState, useRef } from "react";
import { Rnd } from "react-rnd";

import clsx from "clsx";
import Image from "next/image";

import { makeWindowActiveEvent } from "../windowManager";

import events, { WindowDetails } from "../windowManager/events";
import { desktopWindowEvents } from "../windowManager/events";
import IconXMark from "@/components/icons/x-mark";

export type WindowContract = {
  id: string;
  title: string;
  icon: string;
  route: string;
  width?: string;
  height?: string;
  maxWidth?: number;
  center?: boolean;
  isInitiallyOpen?: boolean;
  hasDesktopIcon?: boolean;
  children?: React.ReactNode;
};

export default function DesktopWindow({
  id,
  title,
  icon,
  route,
  width,
  height,
  maxWidth,
  center,
  isInitiallyOpen,
  hasDesktopIcon,
  children,
}: WindowContract) {
  const [titleState, setTitleState] = useState(title);
  const [routeState, setRouteState] = useState(route);
  const [zIndexState, setZIndexState] = useState(0);
  const [visibleState, setVisibleState] = useState(false);
  const [activeState, setActiveState] = useState(false);
  const [initDoneState, setInitDoneState] = useState(false);
  const [maxHeight, setMaxHeight] = useState(9999);

  const rndRef = useRef<Rnd>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  desktopWindowEvents.updateWindowDetailsEvent.useOnUpdateWindowDetailsListener(
    (windowDetails) => {
      if (windowDetails.id !== id) return;

      setActiveState(windowDetails.active);
      setZIndexState(windowDetails.zIndex);
      setVisibleState(windowDetails.visible);
      setTitleState(windowDetails.title);
      setRouteState(windowDetails.route);
    },
  );

  events.windowStartRouteChanged.useOnWindowStartRouteChangedListener(
    (windowDetails) => {
      if (windowDetails.id !== id) return;

      setTimeout(() => {
        setRouteState(windowDetails.route);
      });
    },
  );

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    let target = event.target as HTMLElement;

    while (target) {
      if (target.tagName === "A") break;
      target = target.parentElement as HTMLElement;
    }

    if (!target || target.tagName !== "A") return;
    const href = (target as HTMLAnchorElement).getAttribute("href");

    if (href) {
      setRouteState(href);
    }
  };

  const currentWindowDetails = useCallback((): WindowDetails => {
    return {
      id: id,
      name: title,
      icon: icon,
      startRoute: route,
      isInitiallyOpen: isInitiallyOpen,
      hasDesktopIcon: hasDesktopIcon,
      title: titleState,
      route: routeState,
      active: activeState,
      visible: visibleState,
      zIndex: zIndexState,
    };
  }, [
    id,
    title,
    icon,
    route,
    isInitiallyOpen,
    hasDesktopIcon,
    titleState,
    routeState,
    activeState,
    visibleState,
    zIndexState,
  ]);

  useEffect(() => {
    events.windowRegisteredEvent.emitOnWindowRegistered(currentWindowDetails());

    return () => {
      events.windowDestroyedEvent.emitOnWindowDestroyed(currentWindowDetails());
    };
  }, []); // Please ignore here: Warning: React Hook useEffect has a missing dependency: 'currentWindowDetails'.

  useEffect(() => {
    events.windowTitleChanged.emitOnWindowTitleChanged(currentWindowDetails());
  }, [titleState, currentWindowDetails]);

  useEffect(() => {
    events.windowActivatedEvent.emitOnWindowActivated(currentWindowDetails());
  }, [activeState, currentWindowDetails]);

  useEffect(() => {
    events.windowOpenedEvent.emitOnWindowOpened(currentWindowDetails());
  }, [visibleState, currentWindowDetails]);

  useEffect(() => {
    const setSize = function (
      width: number,
      height: number,
      parentWidth: number,
      parentHeight: number,
    ) {
      rndRef.current?.updateSize({ width: width, height: height });

      if (!(center === undefined ? true : center)) return;

      const left = parentWidth / 2 - width / 2;
      const top = parentHeight / 2 - height / 2 + 27; // TitleBar;

      rndRef.current?.updatePosition({ x: left, y: top });
    };

    if (!visibleState) return;

    const self = rndRef.current?.getSelfElement();
    const parentSize = rndRef.current?.getParentSize();

    if (self == null || parentSize == null) return;

    let selfSize = { width: parentSize.width, height: parentSize.height };

    let effectiveWidth = width;
    let effectiveHeight = height;

    // Responsive ...
    if (parentSize.width < 768) {
      effectiveWidth = "100%";

      if (height) effectiveHeight = "100%";
    }

    // Height resize bug fix ...
    if (effectiveHeight?.endsWith("%")) {
      const heightPercent = parseInt(effectiveHeight.replace("%", ""));
      const heightPx = (heightPercent / 100) * parentSize.height;
      selfSize.height = heightPx;
    }

    if (effectiveWidth?.endsWith("%")) {
      const widthPercent = parseInt(effectiveWidth.replace("%", ""));
      const widthPx = (widthPercent / 100) * parentSize.width;

      selfSize.width = widthPx;
    }

    if (maxWidth && selfSize.width > maxWidth) {
      selfSize.width = maxWidth;
    }

    setTimeout(() => {
      setSize(
        selfSize.width,
        selfSize.height,
        parentSize.width,
        parentSize.height,
      );

      // Auto height
      if ((!Boolean(height) || height === "auto") && childrenRef.current) {
        setTimeout(() => {
          const childHeight =
            childrenRef.current?.getBoundingClientRect().height ?? 0;

          if (childHeight == 0 || childHeight >= parentSize.height - 32) {
            setInitDoneState(true);
            return;
          }

          setSize(
            selfSize.width,
            childHeight + 32, // + Title & Border
            parentSize.width,
            parentSize.height,
          );

          setMaxHeight(childHeight + 32);
          setInitDoneState(true);
        }, 10);
      } else {
        setInitDoneState(true);
      }
    });
  }, [visibleState, center, width, height, maxWidth]);

  const activateWindow = () => {
    makeWindowActiveEvent.emitOnMakeWindowActiveEvent(currentWindowDetails());
  };

  const closeWindow = () => {
    setVisibleState(false);
    setActiveState(false);
    setRouteState(route);
    setInitDoneState(false);

    const currentWindow = currentWindowDetails();
    currentWindow.route = route;
    currentWindow.active = false;
    currentWindow.visible = false;

    events.windowRouteChanged.emitOnWindowRouteChanged(currentWindow);
  };

  const windowClasses = clsx("rounded-md shadow-md border-2 relative", {
    "bg-white/80 dark:bg-neutral-700/80 dark:border-sky-600 border-sky-500":
      activeState,
    "bg-white/50 dark:bg-neutral-700/50 border-neutral-700/50": !activeState,
    "opacity-0": !initDoneState,
  });

  const windowTitleClass = clsx(
    "grow text-center cursor-move justify-center align-middle vertical-center truncate px-2 pt-[1px]",
    {
      "font-bold": activeState,
    },
  );

  const contentClass = clsx(
    "h-max w-full transition-all duration-300 delay-150",
    {
      grayscale: !activeState,
    },
  );

  return (
    <>
      {visibleState && (
        <Rnd
          className={windowClasses}
          bounds="parent"
          minHeight={300}
          minWidth={400}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          style={{ zIndex: zIndexState }}
          onMouseDown={() => activateWindow()}
          onResize={() => activateWindow()}
          ref={rndRef}
          dragHandleClassName="draggable"
        >
          <div className="absolute inset-0 -z-10 rounded-md backdrop-blur-md"></div>
          <div className="flex h-full cursor-default flex-col">
            <div className="draggable flex h-7 border-b bg-white/30 dark:border-neutral-600 dark:bg-neutral-800/30">
              <div className="flex flex-none items-center justify-center pl-1">
                <Image
                  src={icon}
                  width={20}
                  height={20}
                  alt={title}
                  className="drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]"
                />
              </div>
              <div className={windowTitleClass}>{titleState}</div>
              <button
                className="flex h-7 w-7 flex-none items-center justify-center rounded-tr-sm border-0 hover:bg-red-500/50 focus:bg-red-500/50 focus:outline-none"
                aria-label="Close"
                onClick={() => closeWindow()}
                onTouchStart={() => closeWindow()}
              >
                <IconXMark />
              </button>
            </div>
            <div
              className="flex overflow-y-auto overflow-x-clip"
              onClick={handleContainerClick}
            >
              <div className={contentClass} ref={childrenRef}>
                {children}
              </div>
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
}
