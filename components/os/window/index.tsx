"use client";

import React, { useEffect, useState, useRef } from "react";
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
    }
  );

  events.windowStartRouteChanged.useOnWindowStartRouteChangedListener(
    (windowDetails) => {
      if (windowDetails.id !== id) return;

      setRouteState(windowDetails.route);
    }
  );

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    let target = event.target as HTMLElement;

    while (target) {
      if (target.tagName === "A") break;
      target = target.parentElement as HTMLElement;
    }

    if (target && target.tagName === "A") {
      const href = (target as HTMLAnchorElement).getAttribute("href");

      if (href) {
        setRouteState(href);

        const currentWindow = currentWindowDetails();
        currentWindow.route = href;
        events.windowRouteChanged.emitOnWindowRouteChanged(currentWindow);
      }
    }
  };

  const currentWindowDetails = (): WindowDetails => {
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
  };

  useEffect(() => {
    events.windowRegisteredEvent.emitOnWindowRegistered(currentWindowDetails());

    return () => {
      events.windowDestroyedEvent.emitOnWindowDestroyed(currentWindowDetails());
    };
  }, []);

  useEffect(() => {
    events.windowTitleChanged.emitOnWindowTitleChanged(currentWindowDetails());
  }, [titleState]);

  useEffect(() => {
    events.windowActivatedEvent.emitOnWindowActivated(currentWindowDetails());
  }, [activeState]);

  useEffect(() => {
    events.windowOpenedEvent.emitOnWindowOpened(currentWindowDetails());
  }, [visibleState]);

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
  
    setTimeout(() => {
      rndRef.current?.updateSize(selfSize);
    });

    if (!(center === undefined ? true : center)) return;

    const left = parentSize.width / 2 - selfSize.width / 2;
    const top = parentSize.height / 2 - selfSize.height / 2;

    setTimeout(() => {
      rndRef.current?.updatePosition({ x: left, y: top });
    }, 0);
  }, [visibleState]);

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

  const resizing = {
    bottom: true,
    bottomLeft: false,
    bottomRight: true,
    left: false,
    right: true,
    top: false,
    topLeft: false,
    topRight: false,
  };

  const windowClasses = classNames(
    "backdrop-blur-sm rounded-md shadow-md border-2",
    {
      "bg-white/80 border-sky-500": activeState,
      "bg-white/50 border-gray-100/50": !activeState,
    }
  );

  const windowTitleClass = classNames(
    "grow text-center cursor-move justify-center align-middle",
    {
      "font-bold": activeState,
    }
  );

  return (
    <>
      {visibleState && (
        <Rnd
          className={windowClasses}
          enableResizing={resizing}
          bounds="parent"
          minHeight={300}
          minWidth={400}
          style={{ zIndex: zIndexState }}
          onMouseDown={() => activateWindow()}
          onResize={() => activateWindow()}
          ref={rndRef}
        >
          <div className="cursor-default flex flex-col h-full">
            <div className="flex h-6 border-b bg-white/30">
              <div className="flex-none flex w-7 h-6 items-center justify-center">
                <Image
                  src={icon}
                  width={20}
                  height={20}
                  alt={title}
                  className="drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]"
                />
              </div>
              <div className={windowTitleClass}>{titleState}</div>
              <div
                className="flex-none flex w-6 h-6 items-center justify-center hover:bg-red-500/50 rounded-tr-sm"
                onClick={() => closeWindow()}
              >
                <IconXMark />
              </div>
            </div>
            <div
              className="w-auto flex flex-grow overflow-y-auto"
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
