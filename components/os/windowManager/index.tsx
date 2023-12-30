import Taskbar from "../taskbar";
import Window from "../window";
import TitleBar from "../titlebar";

import events, { WindowDetails, desktopWindowEvents } from "./events";

import { createEvent } from "react-event-hook";
import { register } from "module";

let windowArray = Array<Window>();
let entryPath = "/";

let taskbarInstance: Taskbar;
let titleBarInstance: TitleBar;

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

function isWindowAlreadyRegistered(window: Window): boolean {
  let isRegistered = false;

  windowArray.forEach(function (registeredWindow) {
    if (registeredWindow.props.route === window.props.route) {
      isRegistered = true;
      return;
    }
  });

  return isRegistered;
}

export function registerWindow(window: Window) {
  let newWindowRegistered = false;

  if (!isWindowAlreadyRegistered(window)) {
    newWindowRegistered = true;
    windowArray.push(window);
  }

  if (newWindowRegistered) {
    if (taskbarInstance) taskbarInstance.setWindows(windowArray);
  }

  console.log("registerWindow", windowArray);
  console.trace();
}

export function unregisterWindow(window: Window) {
  windowArray = windowArray.filter(function (registeredWindow) {
    return registeredWindow.props.route !== window.props.route;
  });

  if (taskbarInstance) taskbarInstance.setWindows(windowArray);

  console.log("unregisterWindow", windowArray);
  console.trace();
}

export function clickWindow(window: Window) {
  windowArray = moveElementToStart(windowArray, window);

  windowArray.forEach(function (window, i) {
    window.setZIndex(500 - i);
    window.setActiveState(i === 0);
  });

  window.setVisibleState(true);
  taskbarInstance.setWindows(windowArray);
  titleBarInstance.setActiveWindow(window);

  setTimeout(syncBrowserWithActiveWindow, 10);
}

export function closeWindow(window: Window) {
  window.setVisibleState(false);

  taskbarInstance.setWindows(windowArray);
  titleBarInstance.setActiveWindow(undefined);

  setTimeout(syncBrowserWithActiveWindow, 10);
}

export function openWindow(window: Window) {
  window.setVisibleState(true);
  clickWindow(window);
}

export function registerTaskBar(taskbar: Taskbar) {
  taskbarInstance = taskbar;

  if (windowArray && windowArray.length) {
    taskbarInstance.setWindows(windowArray);
    setTimeout(syncBrowserWithActiveWindow, 10);
  }
}

export function registerTitleBar(titleBar: TitleBar) {
  titleBarInstance = titleBar;
  syncBrowserWithActiveWindow();
}

function moveElementToStart<T>(items: T[], item: T): T[] {
  const itemIndex = items.indexOf(item);

  // Item is not found or it is already on start
  if (itemIndex === -1 || itemIndex === 0) return items;

  items.splice(itemIndex, 1);
  const res = [item].concat(items);

  return res;
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

export type RegisteredWindows = Array<WindowDetails>;

const registeredWindowsChangedEvent = createEvent(
  "onRegisteredWindowsChangedEvent"
)<RegisteredWindows>();

const makeWindowsActiveEvent = createEvent(
  "onMakeWindowsActiveEvent"
)<WindowDetails>();

export { registeredWindowsChangedEvent, makeWindowsActiveEvent };

const registeredWindows: RegisteredWindows = [];

export default function WindowManager({
  children,
}: {
  children: React.ReactNode;
}) {
  // ----------------- WindowManager Events ----------------
  makeWindowsActiveEvent.useOnMakeWindowsActiveEventListener(
    (windowDetails) => {
      const existingWindowsClone: RegisteredWindows = JSON.parse(
        JSON.stringify(registeredWindows)
      );

      const existingWindowIndex = existingWindowsClone.findIndex(
        (window) => window.id === windowDetails.id
      );

      if (existingWindowIndex === -1) return;

      const existingWindow = existingWindowsClone[existingWindowIndex];
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
    }
  );

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
    }
  };

  return <>{children}</>;
}
