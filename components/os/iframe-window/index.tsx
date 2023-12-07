import React, { Component, RefObject } from "react";
import Window, { WindowContract } from "../window";

type IFrameWindowContract = WindowContract & {
  contentRoute?: string;
};

export class IFrameWindow extends Component<IFrameWindowContract> {
  state = {
    contentRoute:
      this.props.contentRoute !== undefined
        ? this.props.contentRoute
        : this.props.route,
  };

  window?: RefObject<Window>;

  render() {
    return (
      <Window ref={this.window} {...this.props}>
        <iframe src={this.state.contentRoute} className="w-full h-full" />
      </Window>
    );
  }
}
