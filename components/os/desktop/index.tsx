import React from "react";

import Taskbar from "../taskbar";

export default function Desktop({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-900 w-screen h-screen flex flex-col">
      <div className="flex-none">Patrick-Arns.de</div>
      <div className="flex-grow">
        {children}
      </div>
      <div className="flex-none">
        <Taskbar />
      </div>
    </div>
  );
}
