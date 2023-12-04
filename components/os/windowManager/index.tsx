import Taskbar from "../taskbar";
import Window from "../window";

let windowArray = Array<Window>();

export function registerWindow(window: Window) {
  if (!windowArray.includes(window)) {
    windowArray.push(window);
  } else return windowArray.indexOf(window);

  if (taskbarInstance) 
    taskbarInstance.setWindows(windowArray);
}

export function clickWindow(window: Window) {
  windowArray = moveElementToStart(windowArray, window);

  windowArray.forEach(function (window, i) {
    window.setZIndex(500 - i);
    window.setActiveState(i === 0);
  });

  window.setVisibleState(true);

  taskbarInstance.setWindows(windowArray);
}

export function closeWindow(window: Window) {
  window.setVisibleState(false);
  taskbarInstance.setWindows(windowArray);
}

export function openWindow(window: Window) {
  window.setVisibleState(true);
  clickWindow(window);
}

let taskbarInstance: Taskbar;

export function registerTaskBar(taskbar: Taskbar) {
  taskbarInstance = taskbar;

  if (windowArray && windowArray.length)
    taskbarInstance.setWindows(windowArray);
}

function moveElementToStart<T>(items: T[], item: T): T[] {
  const itemIndex = items.indexOf(item);

  // Item is not found or it is already on start
  if (itemIndex === -1 || itemIndex === 0) return items;

  items.splice(itemIndex, 1);
  const res = [item].concat(items);

  return res;
}
