"use client";

import React, { Component } from "react";
import Window from "../window";
import Clock from "../clock";

import { registerTitleBar } from "../windowManager";

import Image from "next/image";

export type TitleBarContract = {
  pageName: string;
};

export default class TitleBar extends Component<TitleBarContract> {
  state = {
    activeWindow: null,
    title: this.props.pageName,
    appIcon: null,
  };

  componentDidMount(): void {
    registerTitleBar(this);
  }

  setActiveWindow(activeWindow?: Window) {
    this.setState({
      activeWindow: activeWindow,
    });

    let title = this.props.pageName;
    let appIcon = "/favicons/favicon-32x32.png";

    if (activeWindow) {
      title = this.props.pageName + " - " + activeWindow.state.title;
      appIcon = activeWindow.props.icon;
    }

    this.setState({
      title: title,
      appIcon: appIcon,
    });

    if (typeof window !== "undefined") {
      window.document.title = title;
    }
  }

  render() {
    return (
      <div className="backdrop-blur-lg bg-white/50 flex flex-row px-2 drop-shadow">
        <div className="flex-none">
          <div className="flex flex-row">
            {this.state.appIcon && (
              <div>
                <Image
                  src={this.state.appIcon}
                  alt={this.state.title}
                  width={20}
                  height={20}
                  className="pt-1 pr-1 drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]"
                />
              </div>
            )}
            <div>{this.state.title}</div>
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="flex-none">
          <Clock timeFormat="hh-mm" />
        </div>
      </div>
    );
  }
}
