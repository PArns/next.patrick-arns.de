"use client";

import React, { Component } from "react";
import classNames from "classnames";
import Image from "next/image";

import Window from "../window";

import { registerTaskBar, clickWindow } from "../windowManager";

export default class Taskbar extends Component {
  state = {
    windowArray: Array<Window>,
    activeWindow: Window,
  };

  componentDidMount(): void {
    registerTaskBar(this);
  }

  setWindows(windowArray: Array<Window>) {
    if (!Array.isArray(windowArray) || windowArray.length === 0) return;

    this.setState({
      windowArray: windowArray,
    });
  }

  renderWindowElements(someWin: any) {
    if (Array.isArray(someWin)) {
      const a = Array.from(someWin);
      return a.sort(this.compare).map((win) => (
        <button
          key={win.state.title}
          className="mr-2"
          onClick={() => clickWindow(win)}
        >
          {win.state.title} ({win.state.active ? "active" : "inactive"})
        </button>
      ));
    }
  }

  private compare(a: Window, b: Window) {
    if (a.props.sortIndex < b.props.sortIndex) {
      return -1;
    }
    if (a.props.sortIndex > b.props.sortIndex) {
      return 1;
    }
    return 0;
  }

  render() {
    return (
      <div className="flex">
        <div className="flex flex-grow"></div>
        <div>{this.renderWindowElements(this.state.windowArray)}</div>
        <div className="flex flex-grow"></div>
      </div>
    );
  }
}
