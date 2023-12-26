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

        {socialMediaLinkArray.map((link) => (
          <DesktopIcon
            contentfulIcon={link.icon}
            title={link.name?.toString() as string}
            key={link.name?.toString() as string}
            click={() => {
              window.open(link.link?.toString(), "_blank");
            }}
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
