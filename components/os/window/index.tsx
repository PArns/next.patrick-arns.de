"use client";

import React, { Component } from "react";
import { Rnd } from "react-rnd";

import classNames from "classnames";
import Image from "next/image";

import { registerWindow, clickWindow, closeWindow } from "../windowManager";

type WindowContract = {
  title: string;
  icon: string;
  width?: string;
  height?: string;
  center?: boolean;
  sortIndex: number;
  isInitiallyOpen?: boolean;
  children?: React.ReactNode;
};

export default class Window extends Component<WindowContract> {
  state = {
    zIndex: 0,
    title: this.props.title,
    active: false,
    center: this.props.center === undefined ? true : this.props.center,
    visible:
      this.props.isInitiallyOpen === undefined
        ? false
        : this.props.isInitiallyOpen,
  };

  rnd!: Rnd;

  refRnd = (c: Rnd | null) => {
    if (!c) return;
    this.rnd = c;

    if (this.state.center) {
      const parentSize = c.getParentSize();
      const self = c.getSelfElement();

      if (self == null) return;

      const selfSize = { width: self.offsetWidth, height: self.offsetHeight };

      const left = parentSize.width / 2 - selfSize.width / 2;
      const top = parentSize.height / 2 - selfSize.height / 2;

      setTimeout(() => {
        this.rnd.updatePosition({ x: left, y: top });
      }, 0);
    }
  };

  componentDidMount(): void {
    registerWindow(this);
  }

  setZIndex(newIndex: number) {
    this.setState({
      zIndex: newIndex,
    });
  }

  setActiveState(activeState: boolean) {
    this.setState({
      active: activeState,
    });
  }

  setVisibleState(visibleState: boolean) {
    this.setState({
      visible: visibleState,
    });
  }

  getState() {
    return this.state;
  }

  setTitle(title: string) {
    this.setState({
      title: title,
    });
  }

  render() {
    const resizing = {
      bottom: true,
      bottomLeft: false,
      bottomRight: true,
      left: false,
      right: true,
      top: false,
      topLeft: false,
      topRight: false,
    };

    const classes = classNames(
      "backdrop-blur-sm rounded-md shadow-md border-2",
      {
        "bg-white/80 border-sky-500": this.state.active,
        "bg-white/50 border-gray-100/50": !this.state.active,
      }
    );

    if (this.state.visible) {
      return (
        <Rnd
          className={classes}
          enableResizing={resizing}
          bounds="parent"
          minHeight={300}
          minWidth={400}
          default={{
            x: 0,
            y: 0,
            width: this.props.width ? this.props.width : "auto",
            height: this.props.height ? this.props.height : "auto",
          }}
          style={{ zIndex: this.state.zIndex }}
          onMouseDown={() => clickWindow(this)}
          ref={this.refRnd}
        >
          <div className="cursor-default flex flex-col h-full">
            <div className="flex h-7">
              <div className="flex-none flex w-7 h-7 items-center justify-center">
                <Image
                  src={this.props.icon}
                  width={20}
                  height={20}
                  alt={this.props.title}
                />
              </div>
              <div className="grow text-center cursor-move justify-center align-middle">
                {this.state.title}
              </div>
              <div
                className="flex-none flex w-4 h-4 items-center justify-center hover:bg-red-500/90"
                onClick={() => closeWindow(this)}
              >
                <div className="m-1">X</div>
              </div>
            </div>
            <div className="w-auto flex flex-grow overflow-y-auto">
              {this.props.children}
            </div>
          </div>
        </Rnd>
      );
    }
  }
}
