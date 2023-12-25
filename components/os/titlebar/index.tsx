"use client";

import React, { Component } from "react";
import Window from "../window";
import Clock from "../clock";

import { registerTitleBar } from "../windowManager";

export type TitleBarContract = {
  pageName: string;
};

export default class TitleBar extends Component<TitleBarContract> {
  state = {
    activeWindow: null,
    activeTitle: "",
  };

  componentDidMount(): void {
    registerTitleBar(this);
  }

  setActiveWindow(activeWindow?: Window) {

    console.log("TITLE ACTIVE", activeWindow);

    this.setState({
      activeWindow: activeWindow,
    });

    if (activeWindow) {
      this.setState({
        activeTitle: "- " + activeWindow.state.title,
      });
    } else {
      this.setState({
        activeTitle: "",
      });
    }
  }

  render() {
    return (
      <div className="backdrop-blur-lg bg-white/50 flex flex-row px-2 drop-shadow">
        <div className="flex-none">
          {this.props.pageName} {this.state.activeTitle}
        </div>
        <div className="flex-grow"></div>
        <div className="flex-none">
          <Clock timeFormat="hh-mm" />
        </div>
      </div>
    );
  }
}
