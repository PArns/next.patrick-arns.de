"use client";

import React, { Component } from "react";
import Window from "../window";
import Dock from "./dock";

import { registerTaskBar, clickWindow } from "../windowManager";

export default class Taskbar extends Component {
  state = {
    windowArray: Array<Window>,
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

  render() {
    return (
      <div className="flex h-16">
        <div className="flex flex-grow"></div>
        <div>
          <Dock windowsArray={this.state.windowArray} click={clickWindow} />
        </div>
        <div className="flex flex-grow"></div>
      </div>
    );
  }
}
