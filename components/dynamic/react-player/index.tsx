"use client";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"));

export default function DynamicReactPlayer({ url }: { url: string }) {
  return <ReactPlayer src={url} />;
}
