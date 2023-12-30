"use client";

import React, { Component, useEffect, useState, useRef } from "react";
import { Rnd } from "react-rnd";

import classNames from "classnames";
import Image from "next/image";

import {
  registerWindow,
  unregisterWindow,
  clickWindow,
  closeWindow,
  getEntryPath,
} from "../windowManager";

import events, { WindowDetails } from "../windowManager/events";
import { desktopWindowEvents } from "../windowManager/events";

export function shouldBeVisible(
  windowProperties: Readonly<WindowContract>
): boolean {
  const entryUri = getEntryPath(true);
  if (entryUri === windowProperties.route) return true;

  const visible =
    windowProperties.isInitiallyOpen === undefined
      ? false
      : windowProperties.isInitiallyOpen;

  return entryUri === "/" ? visible : false;
}

export function shouldBeActive(
  windowProperties: Readonly<WindowContract>
): boolean {
  const entryUri = getEntryPath(true);

  if (entryUri === windowProperties.route) return true;
  return false;
}

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

export function DesktopWindow({
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

  const [visibleState, setVisibleState] = useState(
    shouldBeVisible({
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
    })
  );

  const [activeState, setActiveState] = useState(
    shouldBeActive({
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
    })
  );

  const rndRef = useRef<Rnd>(null);

  desktopWindowEvents.updateWindowDetailsEvent.useOnUpdateWindowDetailsListener(
    (windowDetails) => {
      if (windowDetails.id !== id) return;

      setActiveState(windowDetails.active);
      setZIndexState(windowDetails.zIndex);
      setVisibleState(windowDetails.visible);
    }
  );

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
      title: titleState,
      icon: icon,
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
    events.windowRouteChanged.emitOnWindowRouteChanged(currentWindowDetails());
  }, [routeState]);

  useEffect(() => {
    events.windowActivatedEvent.emitOnWindowActivated(currentWindowDetails());
  }, [activeState]);

  useEffect(() => {
    events.windowOpenedEvent.emitOnWindowOpened(currentWindowDetails());
  }, [visibleState]);

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
          onMouseDown={() => setActiveState(true)}
          onResize={() => setActiveState(true)}
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
                onClick={() => setVisibleState(false)}
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

export default class Window extends Component<WindowContract> {
  state = {
    title: this.props.title,
    route: this.props.route,
    zIndex: 0,
    visible: shouldBeVisible(this.props),
    active: shouldBeActive(this.props),
    center: this.props.center === undefined ? true : this.props.center,
  };

  rnd!: Rnd;

  refRnd = (c: Rnd | null) => {
    if (!c) return;
    this.rnd = c;

    if (this.state.center) {
      const parentSize = c.getParentSize();
      const self = c.getSelfElement();

      if (self == null) return;

      const selfSize = { width: self.offsetWidth, height: self.offsetHeight };

      const left = parentSize.width / 2 - selfSize.width / 2;
      const top = parentSize.height / 2 - selfSize.height / 2;

      setTimeout(() => {
        this.rnd.updatePosition({ x: left, y: top });
      }, 0);
    }
  };

  componentDidMount(): void {
    registerWindow(this);
    this.correntEntryRoute();

    events.windowRegisteredEvent.emitOnWindowRegistered(
      this.currentWindowDetails()
    );
  }

  currentWindowDetails(): WindowDetails {
    return {
      id: this.props.title,
      name: this.props.title,
      icon: this.props.icon,

      title: this.state.title,
      route: this.state.route,
      active: this.state.active,
      visible: this.state.visible,
      zIndex: this.state.zIndex,
    };
  }

  correntEntryRoute() {
    const entryUri = getEntryPath(true);
    const fullUri = getEntryPath(false);

    if (entryUri !== this.props.route || entryUri === fullUri) return;
    this.setRoute(fullUri);
  }

  setZIndex(newIndex: number) {
    this.setState({
      zIndex: newIndex,
    });
  }

  setActiveState(activeState: boolean) {
    this.setState({
      active: activeState,
    });
  }

  setVisibleState(visibleState: boolean) {
    this.setState({
      visible: visibleState,
    });
  }

  setRoute(route: string) {
    this.setState({
      route: route,
    });
  }

  setTitle(title: string) {
    this.setState({
      title: title,
    });
  }

  getState() {
    return this.state;
  }

  handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target && target.tagName === "A") {
      const href = (target as HTMLAnchorElement).getAttribute("href");

      if (href) this.setRoute(href);
    }
  };

  render() {
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

    const classes = classNames(
      "backdrop-blur-sm rounded-md shadow-md border-2",
      {
        "bg-white/80 border-sky-500": this.state.active,
        "bg-white/50 border-gray-100/50": !this.state.active,
      }
    );

    if (this.state.visible) {
      return (
        <Rnd
          className={classes}
          enableResizing={resizing}
          bounds="parent"
          minHeight={300}
          minWidth={400}
          default={{
            x: 0,
            y: 0,
            width: this.props.width ? this.props.width : "auto",
            height: this.props.height ? this.props.height : "auto",
          }}
          style={{ zIndex: this.state.zIndex }}
          onMouseDown={() => clickWindow(this)}
          onResize={() => clickWindow(this)}
          ref={this.refRnd}
        >
          <div className="cursor-default flex flex-col h-full">
            <div className="flex h-7">
              <div className="flex-none flex w-7 h-7 items-center justify-center">
                <Image
                  src={this.props.icon}
                  width={20}
                  height={20}
                  alt={this.props.title}
                  className="drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]"
                />
              </div>
              <div className="grow text-center cursor-move justify-center align-middle">
                LEGACY WINDOW - {this.state.title}
              </div>
              <div
                className="flex-none flex w-4 h-4 items-center justify-center hover:bg-red-500/90"
                onClick={() => closeWindow(this)}
              >
                <div className="m-1">X</div>
              </div>
            </div>
            <div
              className="w-auto flex flex-grow overflow-y-auto"
              onClick={this.handleContainerClick}
            >
              {this.props.children}
            </div>
          </div>
        </Rnd>
      );
    }
  }
}
