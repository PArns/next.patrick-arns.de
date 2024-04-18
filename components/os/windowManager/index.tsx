"use client";

import events, { WindowDetails, desktopWindowEvents } from "./events";
import { createEvent } from "react-event-hook";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import PageBaseConfiguration from "@/configuration";

function moveElementToStart<T>(items: T[], item: T): T[] {
  const itemIndex = items.indexOf(item);

  // Item is not found or it is already on start
  if (itemIndex === -1 || itemIndex === 0) return items;

  items.splice(itemIndex, 1);
  const res = [item].concat(items);

  return res;
}

export type RegisteredWindows = Array<WindowDetails>;

export type WindowTitleChangeInformation = {
  windowId: string;
  newTitle: string;
};

let initialActiveWindowSet: boolean = false;

const registeredWindowsChangedEvent = createEvent(
  "onRegisteredWindowsChangedEvent",
)<RegisteredWindows>();

const makeWindowActiveEvent = createEvent(
  "onMakeWindowActiveEvent",
)<WindowDetails>();

const activeWindowChangedEvent = createEvent(
  "onActiveWindowChangedEvent",
)<WindowDetails | null>();

const changeWindowTitleEvent = createEvent(
  "onChangeWindowTitleEvent",
)<WindowTitleChangeInformation>();

const getCurrentLocale = (): string => {
  return currentLocale;
};

const getLocaleFromRoute = (route: string): string | null => {
  const trimmedRoute = route.startsWith("/") ? route.slice(1) : route;
  const routeParts = trimmedRoute.split("/");

  if (routeParts.length > 0) {
    const locale = routeParts[0];
    return locale;
  }

  return null;
};

const removeLocaleFromRoute = (
  routeToRemoveLocaleFrom: string,
  localeToBeRemoved?: string,
): string => {
  if (!Boolean(localeToBeRemoved)) localeToBeRemoved = getCurrentLocale();

  if (
    routeToRemoveLocaleFrom === `/${localeToBeRemoved}` ||
    routeToRemoveLocaleFrom === `/${localeToBeRemoved}/`
  )
    return "/";

  if (!routeToRemoveLocaleFrom.startsWith(`/${localeToBeRemoved}`))
    return routeToRemoveLocaleFrom;

  return routeToRemoveLocaleFrom.substring(`/${localeToBeRemoved}`.length);
};

const addLocaleToRoute = (
  routeToAddLocaleTo: string,
  localeToBeAdded?: string,
): string => {
  if (!Boolean(localeToBeAdded)) localeToBeAdded = getCurrentLocale();

  const removedLocale = removeLocaleFromRoute(
    routeToAddLocaleTo,
    localeToBeAdded,
  );

  return `/${localeToBeAdded}${removedLocale}`;
};

const getWindowById = (id: string): WindowDetails | null => {
  const existingWindowIndex = registeredWindows.findIndex(
    (window) => window.id === id,
  );

  if (existingWindowIndex === -1) return null;

  return registeredWindows[existingWindowIndex];
};

const getActiveWindow = (): WindowDetails | null => {
  return registeredWindows.find((window) => window.active === true) ?? null;
};

export {
  registeredWindowsChangedEvent,
  makeWindowActiveEvent,
  changeWindowTitleEvent,
  activeWindowChangedEvent,
  getCurrentLocale,
  removeLocaleFromRoute,
  addLocaleToRoute,
  getLocaleFromRoute,
  getWindowById,
};

const registeredWindows: RegisteredWindows = [];
let currentLocale: string = "";

export function WindowTitle({ id, title }: { id: string; title: string }) {
  setTimeout(() => {
    changeWindowTitleEvent.emitOnChangeWindowTitleEvent({
      windowId: id,
      newTitle: title,
    });
  }, 100);

  return null;
}

export default function WindowManager() {
  const router = useRouter();
  const pathName = usePathname();
  const config = PageBaseConfiguration();

  const localeFromRoute = getLocaleFromRoute(pathName);
  currentLocale = localeFromRoute ?? config.defaultLocale;

  const setTitleAndRouteFromActiveWindow = (
    activeWindow: WindowDetails | null,
  ) => {
    const config = PageBaseConfiguration();
    const newRoute = addLocaleToRoute(activeWindow?.route ?? "/");

    if (newRoute !== window.location.pathname) {
      router.push(newRoute);
    }

    let newTitle = config.title;

    if (activeWindow) {
      newTitle = `${activeWindow.title} - ${config.title}`;
    } else {
      newTitle = config.title;
    }

    if (document.title !== newTitle) {
      document.title = newTitle;
    }

    activeWindowChangedEvent.emitOnActiveWindowChangedEvent(activeWindow);
  };

  // ----------------- WindowManager Events ----------------
  makeWindowActiveEvent.useOnMakeWindowActiveEventListener((windowDetails) => {
    const existingWindowsClone: RegisteredWindows = JSON.parse(
      JSON.stringify(registeredWindows),
    );

    const existingWindowIndex = existingWindowsClone.findIndex(
      (window) => window.id === windowDetails.id,
    );

    if (existingWindowIndex === -1) return;

    const existingWindow = existingWindowsClone[existingWindowIndex];
    if (existingWindow.active) return;

    const newWindowOrder = moveElementToStart(
      existingWindowsClone,
      existingWindow,
    );

    // Correct zIndex and active state for all windows
    newWindowOrder.forEach((window, i) => {
      window.zIndex = 500 - i;
      window.active = i === 0;

      if (window.active) {
        window.visible = true;
      }
    });

    // Update the registeredWindows array
    newWindowOrder.forEach((newWindow) => {
      updateWindowDetails(newWindow);
    });

    setTitleAndRouteFromActiveWindow(windowDetails);
  });

  changeWindowTitleEvent.useOnChangeWindowTitleEventListener(
    (changeInformation) => {
      const window = getWindowById(changeInformation.windowId);
      if (!window || window.title === changeInformation.newTitle) return;

      window.title = changeInformation.newTitle;

      // Fire the updateWindowDetailsEvent
      desktopWindowEvents.updateWindowDetailsEvent.emitOnUpdateWindowDetails(
        window,
      );

      if (window.active) {
        activeWindowChangedEvent.emitOnActiveWindowChangedEvent(window);
        setTitleAndRouteFromActiveWindow(window);
      }
    },
  );

  // -------------------- Window Events --------------------
  events.windowDestroyedEvent.useOnWindowDestroyedListener(
    (destroyedWindow) => {
      const existingWindowIndex = registeredWindows.findIndex(
        (window) => window.id === destroyedWindow.id,
      );

      if (existingWindowIndex !== -1) {
        registeredWindows.splice(existingWindowIndex, 1);
      }

      registeredWindowsChangedEvent.emitOnRegisteredWindowsChangedEvent(
        registeredWindows,
      );
    },
  );

  events.windowRegisteredEvent.useOnWindowRegisteredListener((newWindow) => {
    // Set startup window, once it's registered ...
    if (pathName) {
      const startRoute = removeLocaleFromRoute(pathName, currentLocale);

      if (startRoute != "/" && startRoute.startsWith(newWindow.startRoute)) {
        // correct route of the app to the given URL ...
        if (startRoute !== newWindow.route) {
          newWindow.route = startRoute;
          events.windowStartRouteChanged.emitOnWindowStartRouteChanged(
            newWindow,
          );
        }

        // ... and make it active
        setTimeout(
          () => makeWindowActiveEvent.emitOnMakeWindowActiveEvent(newWindow),
          1000,
        );
      } else if (startRoute == "/" && newWindow.isInitiallyOpen) {
        // If the app is initially open, make it active
        setTimeout(
          () => makeWindowActiveEvent.emitOnMakeWindowActiveEvent(newWindow),
          1000,
        );
      }
    }

    updateWindowDetails(newWindow);
  });

  events.windowActivatedEvent.useOnWindowActivatedListener(
    (activatedWindow) => {
      updateWindowDetails(activatedWindow);
    },
  );

  events.windowOpenedEvent.useOnWindowOpenedListener((openedWindow) => {
    updateWindowDetails(openedWindow);
  });

  events.windowRouteChanged.useOnWindowRouteChangedListener((changedWindow) => {
    updateWindowDetails(changedWindow);
  });

  events.windowTitleChanged.useOnWindowTitleChangedListener((changedWindow) => {
    updateWindowDetails(changedWindow);
  });

  const updateWindowDetails = (windowDetails: WindowDetails) => {
    const existingWindowIndex = registeredWindows.findIndex(
      (window) => window.id === windowDetails.id,
    );

    let changesMade = false;

    if (existingWindowIndex !== -1) {
      const existingWindow = registeredWindows[existingWindowIndex];

      if (JSON.stringify(existingWindow) !== JSON.stringify(windowDetails)) {
        // If a window with the same id exists and has changed, update its properties
        registeredWindows[existingWindowIndex] = {
          ...registeredWindows[existingWindowIndex],
          ...windowDetails,
        };

        // Fire the updateWindowDetailsEvent
        desktopWindowEvents.updateWindowDetailsEvent.emitOnUpdateWindowDetails(
          windowDetails,
        );

        changesMade = true;
      }
    } else {
      // If no window with the same id exists, add the new window to the array
      registeredWindows.push(windowDetails);
      changesMade = true;
    }

    // Trigger the registeredWindowsChangedEvent with the updated registeredWindows array
    // only if changes were made
    if (changesMade) {
      registeredWindowsChangedEvent.emitOnRegisteredWindowsChangedEvent(
        registeredWindows,
      );

      if (!windowDetails.visible || !windowDetails.active) {
        const activeWindow = getActiveWindow();

        if (activeWindow) initialActiveWindowSet = true;

        if (initialActiveWindowSet && !activeWindow) {
          setTitleAndRouteFromActiveWindow(null);
        }
      }
    }
  };

  return null;
}
