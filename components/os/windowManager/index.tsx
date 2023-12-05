import Taskbar from "../taskbar";
import Window from "../window";

let windowArray = Array<Window>();
let entryPath = "/";

export function getEntryPath(appPathOnly: boolean) {
  if (!appPathOnly) return entryPath;

  const appPath = entryPath.split("/")[1];
  return "/" + appPath;
}

export function registerWindow(window: Window) {
  if (!windowArray.includes(window)) {
    windowArray.push(window);
  } else return windowArray.indexOf(window);

  if (taskbarInstance) taskbarInstance.setWindows(windowArray);
}

export function clickWindow(window: Window) {
  windowArray = moveElementToStart(windowArray, window);

  windowArray.forEach(function (window, i) {
    window.setZIndex(500 - i);
    window.setActiveState(i === 0);
  });

  window.setVisibleState(true);
  taskbarInstance.setWindows(windowArray);

  setTimeout(syncBrowserWithActiveWindow, 10);
}

export function closeWindow(window: Window) {
  window.setVisibleState(false);

  taskbarInstance.setWindows(windowArray);
  setTimeout(syncBrowserWithActiveWindow, 10);
}

export function openWindow(window: Window) {
  window.setVisibleState(true);
  clickWindow(window);
}

let taskbarInstance: Taskbar;

export function registerTaskBar(taskbar: Taskbar) {
  taskbarInstance = taskbar;

  if (windowArray && windowArray.length) {
    taskbarInstance.setWindows(windowArray);
    setTimeout(syncBrowserWithActiveWindow, 10);
  }
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
    if (window.state.active) {
      setUriFromActiveWindow(window);
      windowFound = true;
      return;
    }
  });

  if (!windowFound) setUriFromActiveWindow(null);
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

function start() {
  if (typeof window === "undefined") return;

  console.log("START!", window.location.pathname);
  entryPath = window.location.pathname;
}

start();
