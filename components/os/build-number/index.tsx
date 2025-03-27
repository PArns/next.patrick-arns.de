import DateRenderer from "@/components/date-renderer";
import fs from "fs";
import path from "path";
import React from "react";

export const dynamic = "force-static";

export default function BuildInfo() {
  const buildInfoPath = path.resolve(process.cwd(), "build-info.json");
  const buildInfo = JSON.parse(fs.readFileSync(buildInfoPath, "utf8"));
  const buildDate = new Date(buildInfo.buildDate);

  return (
    <div className="flex items-center">
      <span className="text-xs text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        <span>Version: </span>{buildInfo.buildNumber} <span className="hidden md:inline">(<DateRenderer date={buildDate} />)</span>
      </span>
    </div>
  );
}
