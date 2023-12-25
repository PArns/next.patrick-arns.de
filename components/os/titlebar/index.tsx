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
    title: this.props.pageName,
  };

  componentDidMount(): void {
    registerTitleBar(this);
  }

  setActiveWindow(activeWindow?: Window) {
    this.setState({
      activeWindow: activeWindow,
    });

    let title = this.props.pageName;

    if (activeWindow) {
      title = this.props.pageName + " - " + activeWindow.state.title;
    }

    this.setState({
      title: title,
    });

    if (typeof window !== "undefined") {
      window.document.title = title;
    }
  }

  render() {
    return (
      <div className="backdrop-blur-lg bg-white/50 flex flex-row px-2 drop-shadow">
        <div className="flex-none">{this.state.title}</div>
        <div className="flex-grow"></div>
        <div className="flex-none">
          <Clock timeFormat="hh-mm" />
        </div>
      </div>
    );
  }
}
