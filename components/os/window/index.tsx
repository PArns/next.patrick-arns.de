"use client";

import React, { useEffect, useCallback, useState, useRef } from "react";
import { Rnd } from "react-rnd";

import classNames from "classnames";
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

  const rndRef = useRef<Rnd>(null);

  desktopWindowEvents.updateWindowDetailsEvent.useOnUpdateWindowDetailsListener(
    (windowDetails) => {
      if (windowDetails.id !== id) return;

      setActiveState(windowDetails.active);
      setZIndexState(windowDetails.zIndex);
      setVisibleState(windowDetails.visible);
    },
  );

  events.windowStartRouteChanged.useOnWindowStartRouteChangedListener(
    (windowDetails) => {
      if (windowDetails.id !== id) return;

      setRouteState(windowDetails.route);
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

      const currentWindow = currentWindowDetails();
      currentWindow.route = href;
      events.windowRouteChanged.emitOnWindowRouteChanged(currentWindow);
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
    if (!visibleState) return;

    const self = rndRef.current?.getSelfElement();
    const parentSize = rndRef.current?.getParentSize();

    if (self == null || parentSize == null) return;

    let selfSize = { width: self.offsetWidth, height: self.offsetHeight };

    // Height resize bug fix ...
    if (height?.endsWith("%")) {
      const heightPercent = parseInt(height.replace("%", ""));
      const heightPx = (heightPercent / 100) * parentSize.height;
      selfSize.height = heightPx;
    }

    if (width?.endsWith("%")) {
      const widthPercent = parseInt(width.replace("%", ""));
      const widthPx = (widthPercent / 100) * parentSize.width;

      selfSize.width = widthPx;
    }

    if (maxWidth && selfSize.width > maxWidth) {
      selfSize.width = maxWidth;
    }

    setTimeout(() => {
      rndRef.current?.updateSize(selfSize);
    });

    if (!(center === undefined ? true : center)) return;

    const left = parentSize.width / 2 - selfSize.width / 2;
    const top = parentSize.height / 2 - selfSize.height / 2;

    setTimeout(() => {
      rndRef.current?.updatePosition({ x: left, y: top });
    }, 0);
  }, [visibleState, center, width, height, maxWidth]);

  const activateWindow = () => {
    makeWindowActiveEvent.emitOnMakeWindowActiveEvent(currentWindowDetails());
  };

  const closeWindow = () => {
    setVisibleState(false);
    setActiveState(false);
    setRouteState(route);

    const currentWindow = currentWindowDetails();
    currentWindow.route = route;
    currentWindow.active = false;
    currentWindow.visible = false;

    events.windowRouteChanged.emitOnWindowRouteChanged(currentWindow);
  };

  const windowClasses = classNames(
    "backdrop-blur-sm rounded-md shadow-md border-2",
    {
      "bg-white/80 border-sky-500": activeState,
      "bg-white/50 border-gray-100/50": !activeState,
    },
  );

  const windowTitleClass = classNames(
    "grow text-center cursor-move justify-center align-middle vertical-center",
    {
      "font-bold": activeState,
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
          style={{ zIndex: zIndexState }}
          onMouseDown={() => activateWindow()}
          onResize={() => activateWindow()}
          ref={rndRef}
          dragHandleClassName="draggable"
        >
          <div className="flex h-full cursor-default flex-col">
            <div className="draggable flex h-7 border-b bg-white/30">
              <div className="flex h-7 w-8 flex-none items-center justify-center">
                <Image
                  src={icon}
                  width={24}
                  height={24}
                  alt={title}
                  className="drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]"
                />
              </div>
              <div className={windowTitleClass}>{titleState}</div>
              <div
                className="flex h-7 w-7 flex-none items-center justify-center rounded-tr-sm hover:bg-red-500/50"
                onClick={() => closeWindow()}
              >
                <IconXMark />
              </div>
            </div>
            <div
              className="flex w-auto flex-grow overflow-y-auto"
              onClick={handleContainerClick}
            >
              {children}
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
}
