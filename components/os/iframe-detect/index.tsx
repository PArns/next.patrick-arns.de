"use client";

export default function IFrameDetect() {
  if (typeof window !== "undefined") {
    if (window.self === window.top) {
      window.location.href = "/#" + window.location.pathname;
    }
  }

  return null;
}
