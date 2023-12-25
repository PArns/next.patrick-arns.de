"use client";

import React, { Component, MouseEvent } from "react";
import Window from "../window";
import Image from "next/image";

import { registerDesktopIconContainer, clickWindow } from "../windowManager";

export default class IconContainer extends Component {
  state = {
    windowArray: Array<Window>,
  };

  componentDidMount(): void {
    registerDesktopIconContainer(this);
  }

  setWindows(windowArray: Array<Window>) {
    if (!Array.isArray(windowArray) || windowArray.length === 0) return;

    this.setState({
      windowArray: windowArray,
    });
  }

  render() {
    let winArray = [];

    if (Array.isArray(this.state.windowArray)) {
      const a = Array.from(this.state.windowArray);
      winArray = a.sort(compare);
    }

    return (
      <div className="flex h-full w-min flex-col flex-wrap m-4 gap-4">
        {winArray.map((window) => (
          <DesktopIcon
            icon={window.props.icon}
            title={window.props.title}
            key={window.props.title}
            click={() => {
              clickWindow(window);
            }}
          />
        ))}
      </div>
    );
  }
}

function DesktopIcon({
  icon,
  title,
  click,
}: {
  icon: string;
  title: string;
  click: Function;
}) {
  const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    click(window);
  };

  return (
    <button
      className="w-28 p-1 select-none rounded-md border border-transparent py-2 text-white transition duration-200 ease-in-out hover:border-sky-100 hover:bg-sky-100/50 hover:backdrop-blur-md dark:hover:border-gray-400 dark:hover:bg-gray-800/50"
      onClick={handleMouseEvent}
    >
      <div className="flex justify-center items-center mb-1">
        <Image
          src={icon}
          width={48}
          height={48}
          alt={title}
          className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        />
      </div>
      <div className="justify-center items-center">
        <p className="text-ellipsis overflow-hidden rop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {title}
        </p>
      </div>
    </button>
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
