"use client";

import events, { WindowDetails, desktopWindowEvents } from "./events";
import { createEvent } from "react-event-hook";
import { useRouter } from "next/navigation";

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
  startRoute,
}: {
  startRoute: string | null;
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

    // Set startup window, once it's registered ...
    if (!startRoute) return;

    if (startRoute != "/" && startRoute.startsWith(newWindow.startRoute)) {
      // correct route of the app to the given URL ...
      if (startRoute !== newWindow.route) {
        newWindow.route = startRoute;
        events.windowStartRouteChanged.emitOnWindowStartRouteChanged(newWindow);
      }

      // ... and make it active
      setTimeout(
        () => makeWindowActiveEvent.emitOnMakeWindowActiveEvent(newWindow),
        100
      );
    } else if (startRoute == "/" && newWindow.isInitiallyOpen) {
      // If the app is initially open, make it active
      setTimeout(
        () => makeWindowActiveEvent.emitOnMakeWindowActiveEvent(newWindow),
        100
      );
    }
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
      {
        activeWindowChangedEvent.emitOnActiveWindowChangedEvent(null);
        router.push("/");
      }
    }
  };

  return <></>;
}
