"use client";

import React, { Component } from "react";
import Window from "../window";
import DesktopIcon from "./desktop-icon";

import { registerDesktopIconContainer, clickWindow } from "../windowManager";
import { TypeSocialMediaLinkFields } from "@/api/types";

export type IconContainerContract = {
  socialMediaLinks?: TypeSocialMediaLinkFields[];
};

export default class IconContainer extends Component<IconContainerContract> {
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
    let winArray: Window[] = [];

    if (Array.isArray(this.state.windowArray)) {
      const a = Array.from(this.state.windowArray);
      winArray = a.sort(compare);
    }

    let socialMediaLinkArray: TypeSocialMediaLinkFields[] = [];

    if (Array.isArray(this.props.socialMediaLinks)) {
      const a = Array.from(this.props.socialMediaLinks);
      socialMediaLinkArray = a.sort(socialMediaLinkCompare);
    }

    return (
      <div className="flex h-screen pb-16 absolute flex-col flex-wrap content-start m-4 gap-2">
        {winArray.map((window) => (
          <DesktopIcon
            icon={window.props.icon}
            name={window.state.title}
            key={window.state.title}
            href={window.state.route}
            click={() => {
              clickWindow(window);
            }}
          />
        ))}

        {socialMediaLinkArray.map((link) => (
          <DesktopIcon
            contentfulIcon={link.icon}
            name={link.name?.toString() as string}
            title={link.title?.toString() as string}
            key={link.name?.toString() as string}
            href={link.link?.toString() as string}
          />
        ))}
      </div>
    );
  }
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

function socialMediaLinkCompare(
  a: TypeSocialMediaLinkFields,
  b: TypeSocialMediaLinkFields
) {
  if (a.order && b.order && a.order < b.order) {
    return -1;
  }
  if (a.order && b.order && a.order > b.order) {
    return 1;
  }
  return 0;
}