"use client";

import React, { Component } from "react";
import Window from "../window";

import { registerDesktopIconContainer, clickWindow } from "../windowManager";

export default class IconContainer extends Component {
  state = {
    windowArray: Array<Window>
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
    return (
      <>ICONS with {this.state.windowArray.length}</>
    );
  }
}