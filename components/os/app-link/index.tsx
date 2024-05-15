"use client";

import {
  makeWindowActiveEvent,
  getWindowById,
  addLocaleToRoute,
} from "../windowManager";
import { MouseEvent } from "react";

export default function AppLink({
  id,
  href,
  className,
  children,
}: {
  id: string;
  href: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const handleMouseEvent = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setTimeout(() => {
      const windowDetails = getWindowById(id);
      if (windowDetails === null) return;

      const localeLink = addLocaleToRoute(href);

      if (addLocaleToRoute(windowDetails.route) !== localeLink)
        windowDetails.route = localeLink;

      makeWindowActiveEvent.emitOnMakeWindowActiveEvent(windowDetails);
    });
  };

  return (
    <a href={href} className={className} onClick={handleMouseEvent}>
      {children}
    </a>
  );
}
