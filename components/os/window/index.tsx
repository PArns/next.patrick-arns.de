"use client";

import React, { useEffect, useState, useRef } from "react";
import { Rnd } from "react-rnd";

import classNames from "classnames";
import Image from "next/image";

import { makeWindowActiveEvent } from "../windowManager";

import events, { WindowDetails } from "../windowManager/events";
import { desktopWindowEvents } from "../windowManager/events";

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

  events.windowRouteChanged.useOnWindowRouteChangedListener((windowDetails) => {
    if (windowDetails.id !== id) return;
    setRouteState(windowDetails.route);
  });

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target && target.tagName === "A") {
      const href = (target as HTMLAnchorElement).getAttribute("href");

      if (href) setRouteState(href);
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
    if (!(center === undefined ? true : center) || !visibleState) return;

    const parentSize = rndRef.current?.getParentSize();
    const self = rndRef.current?.getSelfElement();

    if (self == null || parentSize == null) return;

    const selfSize = { width: self.offsetWidth, height: self.offsetHeight };

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

  const classes = classNames("backdrop-blur-sm rounded-md shadow-md border-2", {
    "bg-white/80 border-sky-500": activeState,
    "bg-white/50 border-gray-100/50": !activeState,
  });

  return (
    <>
      {visibleState && (
        <Rnd
          className={classes}
          enableResizing={resizing}
          bounds="parent"
          minHeight={300}
          minWidth={400}
          default={{
            x: 0,
            y: 0,
            width: width ? width : "auto",
            height: height ? height : "auto",
          }}
          style={{ zIndex: zIndexState }}
          onMouseDown={() => activateWindow()}
          onResize={() => activateWindow()}
          ref={rndRef}
        >
          <div className="cursor-default flex flex-col h-full">
            <div className="flex h-7">
              <div className="flex-none flex w-7 h-7 items-center justify-center">
                <Image
                  src={icon}
                  width={20}
                  height={20}
                  alt={title}
                  className="drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]"
                />
              </div>
              <div className="grow text-center cursor-move justify-center align-middle">
                {titleState}
              </div>
              <div
                className="flex-none flex w-4 h-4 items-center justify-center hover:bg-red-500/90"
                onClick={() => closeWindow()}
              >
                <div className="m-1">X</div>
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
