"use client";

import { Component } from "react";

export type ClockContract = {
  locale?: string;
  timeFormat?: string;
  dateFormat?: string;
  hour12?: boolean;
  separator?: string;
};

export default class Clock extends Component<ClockContract> {
  state = { date: "", time: "" };

  runner!: NodeJS.Timeout;

  getCurrentTime = () => {
    const formatOptions: {
      hour?: "2-digit";
      minute?: "2-digit";
      second?: "2-digit";
    } = {};

    if (this.props.timeFormat) {
      const formatParts = this.props.timeFormat.toLowerCase().split("-");
      if (formatParts.includes("hh")) formatOptions.hour = "2-digit";
      if (formatParts.includes("mm")) formatOptions.minute = "2-digit";
      if (formatParts.includes("ss")) formatOptions.second = "2-digit";
    }

    return new Date().toLocaleTimeString(this.props.locale, {
      hour12: this.props.hour12,
      ...formatOptions,
    });
  };

  getCurrentDate = () => {
    const validDateFormats: Array<"long" | "short" | "narrow"> = [
      "long",
      "short",
      "narrow",
    ];
    const useDateFormat = validDateFormats.includes(
      this.props.dateFormat as "long" | "short" | "narrow",
    )
      ? (this.props.dateFormat as "long" | "short" | "narrow")
      : "short";

    return new Date().toLocaleDateString(this.props.locale, {
      weekday: useDateFormat,
      year: "numeric",
      month: useDateFormat,
      day: "numeric",
    });
  };

  updateDateTime = () => {
    this.setState({
      time: this.getCurrentTime(),
      date: this.getCurrentDate(),
    });
  };

  componentDidMount() {
    this.updateDateTime();
    this.runner = setInterval(this.updateDateTime, 1000); // Updated interval to 1 second for efficiency
  }

  componentWillUnmount() {
    clearInterval(this.runner);
  }

  render() {
    const separator = this.props.separator
      ? ` ${this.props.separator} `
      : " - ";

    return (
      <>
        {this.state.date && (
          <div>
            <span>{this.state.date}</span>
            <span>{separator}</span>
            <span>{this.state.time}</span>
          </div>
        )}
      </>
    );
  }
}
