import DateRenderer from "@/components/date-renderer";
import React from "react";
import buildInfo from "../../../build-info.json";

export const dynamic = "force-static";

export default function BuildInfo() {
  if (!buildInfo) return null;
  const buildDate = new Date(buildInfo.buildDate);

  return (
    <div className="flex items-center">
      <span className="text-xs text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        <span>Version: </span>
        {buildInfo.buildNumber}{" "}
        <span className="hidden md:inline">
          (<DateRenderer date={buildDate} locale="de" />)
        </span>
      </span>
    </div>
  );
}
