"use client";

import { IFrameWindow } from "@/components/os/iframe-window";

export default function Blog() {
  return (
    <IFrameWindow
      sortIndex={1}
      width="50%"
      height="50%"
      route="/blog"
      title="Blog"
      icon="/appicons/blog.png"
    ></IFrameWindow>
  );
}
