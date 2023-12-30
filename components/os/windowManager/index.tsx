"use client";

import events, { WindowDetails, desktopWindowEvents } from "./events";
import { createEvent } from "react-event-hook";
import { useRouter } from "next/navigation";

/*
let windowArray = Array<Window>();
let entryPath = "/";

export function getEntryPath(appPathOnly: boolean) {
  if (!appPathOnly) return entryPath;
  return getAppRoute(entryPath);
}

function getAppRoute(fullPath: string) {
  const appPath = fullPath.split("/")[1];
  return "/" + appPath;
}

function getAppByRoute(appRoute: string) {
  let appForRoute = null;

  windowArray.forEach(function (window, i) {
    if (window.props.route === appRoute) {
      appForRoute = window;
      return;
    }
  });

  return appForRoute;
}

function syncBrowserWithActiveWindow() {
  let windowFound = false;

  windowArray.forEach(function (window, i) {
    if (window.state.active && window.state.visible) {
      setUriFromActiveWindow(window);

      if (titleBarInstance) titleBarInstance.setActiveWindow(window);

      windowFound = true;
      return;
    }
  });

  if (!windowFound) {
    setUriFromActiveWindow(null);
    if (titleBarInstance) titleBarInstance.setActiveWindow(undefined);
  }
}

function setUriFromActiveWindow(activeWindow: Window | null) {
  if (activeWindow == null) {
    checkAndUpdateUri("/");
    return;
  }

  checkAndUpdateUri(activeWindow.state.route);
}

function checkAndUpdateUri(newUri: string) {
  if (window.location.pathname !== newUri)
    window.history.pushState(null, "", newUri);
}

function registerBackNavigationHandler() {
  window.addEventListener("popstate", () => {
    const backApp = getAppRoute(window.location.pathname);
    const appWindow = getAppByRoute(backApp);

    if (appWindow != null) clickWindow(appWindow);
  });
}

function start() {
  if (typeof window === "undefined") return;

  if (window.location.hash) {
    entryPath = window.location.hash;
  } else {
    entryPath = window.location.pathname;
  }

  registerBackNavigationHandler();
}

start();

*/

function moveElementToStart<T>(items: T[], item: T): T[] {
  const itemIndex = items.indexOf(item);

  // Item is not found or it is already on start
  if (itemIndex === -1 || itemIndex === 0) return items;

  items.splice(itemIndex, 1);
  const res = [item].concat(items);

  return res;
}

export type RegisteredWindows = Array<WindowDetails>;

const registeredWindowsChangedEvent = createEvent(
  "onRegisteredWindowsChangedEvent"
)<RegisteredWindows>();

const makeWindowActiveEvent = createEvent(
  "onMakeWindowActiveEvent"
)<WindowDetails>();

const activeWindowChangedEvent = createEvent(
  "onActiveWindowChangedEvent"
)<WindowDetails | null>();

export {
  registeredWindowsChangedEvent,
  makeWindowActiveEvent,
  activeWindowChangedEvent,
};

const registeredWindows: RegisteredWindows = [];

export default function WindowManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const getActiveWindow = (): WindowDetails | null => {
    return registeredWindows.find((window) => window.active === true) ?? null;
  };

  const setRouteFromActiveWindow = (activeWindow: WindowDetails | null) => {
    const newRoute = activeWindow?.route ?? "/";
    router.push(newRoute);
  };

  // ----------------- WindowManager Events ----------------
  makeWindowActiveEvent.useOnMakeWindowActiveEventListener((windowDetails) => {
    const existingWindowsClone: RegisteredWindows = JSON.parse(
      JSON.stringify(registeredWindows)
    );

    const existingWindowIndex = existingWindowsClone.findIndex(
      (window) => window.id === windowDetails.id
    );

    if (existingWindowIndex === -1) return;

    const existingWindow = existingWindowsClone[existingWindowIndex];
    if (existingWindow.active) return;

    const newWindowOrder = moveElementToStart(
      existingWindowsClone,
      existingWindow
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
      const registeredWindowIndex = registeredWindows.findIndex(
        (window) => window.id === newWindow.id
      );

      if (registeredWindowIndex !== -1) {
        const registeredWindow = registeredWindows[registeredWindowIndex];

        if (JSON.stringify(registeredWindow) !== JSON.stringify(newWindow)) {
          // Update the registeredWindow
          registeredWindows[registeredWindowIndex] = newWindow;

          // Fire the updateWindowDetailsEvent
          desktopWindowEvents.updateWindowDetailsEvent.emitOnUpdateWindowDetails(
            newWindow
          );
        }
      }
    });

    activeWindowChangedEvent.emitOnActiveWindowChangedEvent(windowDetails);
    registeredWindowsChangedEvent.emitOnRegisteredWindowsChangedEvent(
      registeredWindows
    );

    setRouteFromActiveWindow(windowDetails);
  });

  // -------------------- Window Events --------------------
  events.windowDestroyedEvent.useOnWindowDestroyedListener(
    (destroyedWindow) => {
      const existingWindowIndex = registeredWindows.findIndex(
        (window) => window.id === destroyedWindow.id
      );

      if (existingWindowIndex !== -1) {
        registeredWindows.splice(existingWindowIndex, 1);
      }

      registeredWindowsChangedEvent.emitOnRegisteredWindowsChangedEvent(
        registeredWindows
      );
    }
  );

  events.windowRegisteredEvent.useOnWindowRegisteredListener((newWindow) => {
    updateWindowDetails(newWindow);
  });

  events.windowActivatedEvent.useOnWindowActivatedListener(
    (activatedWindow) => {
      updateWindowDetails(activatedWindow);
    }
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
      (window) => window.id === windowDetails.id
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
          windowDetails
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
        registeredWindows
      );

      const activeWindow = getActiveWindow();

      if (!activeWindow)
        activeWindowChangedEvent.emitOnActiveWindowChangedEvent(null);
    }
  };

  return <>{children}</>;
}
