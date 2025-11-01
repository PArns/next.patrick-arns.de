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
  const [isScrolling, setIsScrolling] = useState(false);

  const rndRef = useRef<Rnd>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

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

  // Scroll to top on route change - in cleanup to avoid flicker
  useEffect(() => {
    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo(0, 0);
      }
    };
  }, [routeState]);

  // Handle scroll events to temporarily disable blur during scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      // Set scrolling state
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout to re-enable blur after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

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

          setInitDoneState(true);
          calculateMaxHeight();
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

  const resizeWindow = () => {
    activateWindow();
    calculateMaxHeight();
  };

  const calculateMaxHeight = () => {
    const parentSize = rndRef.current?.getParentSize();
    if (
      (!Boolean(height) || height === "auto") &&
      childrenRef.current &&
      parentSize
    ) {
      const childHeight =
        childrenRef.current?.getBoundingClientRect().height ?? 0;

      if (childHeight == 0 || childHeight >= parentSize.height - 32) {
        return;
      }

      setMaxHeight(childHeight + 32);
    }
  };

  const windowClasses = clsx(
    "rounded-md shadow-md border-2 relative transition-colors",
    {
      "bg-white/40 dark:bg-neutral-600/50 dark:border-sky-600 border-sky-500":
        activeState,
      "bg-white/20 dark:bg-neutral-600/20 border-neutral-800/50": !activeState,
      "opacity-0": !initDoneState,
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
          style={{ zIndex: zIndexState, contain: 'layout style paint' }}
          onMouseDown={() => activateWindow()}
          onResize={() => resizeWindow()}
          ref={rndRef}
          dragHandleClassName="draggable"
        >
          <div
            className={clsx(
              "absolute inset-0 -z-10 rounded-md transform-gpu will-change-transform transition-[backdrop-filter] duration-150",
              !isScrolling && "backdrop-blur-md"
            )}
          ></div>
          <div className="flex h-full cursor-default flex-col">
            <header className="draggable flex h-7 border-b bg-white/30 dark:border-neutral-600 dark:bg-neutral-800/30">
              <div className="vertical-center flex w-full cursor-move items-center justify-center truncate pb-0.5 align-middle">
                <div className="px-1.5">
                  <Image
                    src={icon}
                    width={18}
                    height={18}
                    alt={title}
                    className="drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <div className="">{titleState}</div>
              </div>
              <button
                className="flex h-7 w-7 flex-none items-center justify-center rounded-tr-sm border-0 hover:bg-red-500/50 focus:bg-red-500/50 focus:outline-hidden"
                aria-label="Close"
                onClick={() => closeWindow()}
                onTouchStart={() => closeWindow()}
              >
                <IconXMark />
              </button>
            </header>
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-clip overflow-y-auto"
              onClick={handleContainerClick}
            >
              <main className={contentClass} ref={childrenRef}>
                {children}
              </main>
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
}
