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
      <div className="flex flex-col m-4 gap-4">
        {winArray.map((window) => (
          <DesktopIcon
            window={window}
            click={() => {
              clickWindow(window);
            }}
          />
        ))}
      </div>
    );
  }
}

function DesktopIcon({ window, click }: { window: Window; click: Function }) {
  const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    click(window);
  };

  return (
    <button
      className="hover:bg-white/50 bg-white/20 border border-white/20 w-28 flex flex-col backdrop-blur-lg rounded-lg p-2"
      onClick={handleMouseEvent}
    >
      <div className="flex justify-center items-center w-full mb-1">
        <Image
          src={window.props.icon}
          width={60}
          height={60}
          alt={window.props.title}
          className="object-contain"
        />
      </div>
      <div className="justify-center items-center w-full">
        <p className="text-ellipsis overflow-hidden">{window.props.title}</p>
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
