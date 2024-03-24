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
      const localeLink = addLocaleToRoute(href);

      if (windowDetails === null) return;

      if (addLocaleToRoute(windowDetails.route) !== localeLink)
        windowDetails.route = localeLink;

      makeWindowActiveEvent.emitOnMakeWindowActiveEvent(windowDetails);
    }, 100);
  };

  return (
    <a href={href} className={className} onClick={handleMouseEvent}>
      {children}
    </a>
  );
}
