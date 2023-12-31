import { createEvent } from "react-event-hook";

export interface WindowDetails {
  id: string;
  name: string;
  title: string;
  icon: string;
  isInitiallyOpen?: boolean;
  hasDesktopIcon?: boolean;
  startRoute: string;
  route: string;
  active: boolean;
  visible: boolean;
  zIndex: number;
}

export type RegisteredWindows = Array<WindowDetails>;

const updateWindowDetailsEvent = createEvent(
  "onUpdateWindowDetails"
)<WindowDetails>();

const desktopWindowEvents = {
  updateWindowDetailsEvent,
};

export { desktopWindowEvents };

const windowRegisteredEvent = createEvent("onWindowRegistered")<WindowDetails>();
const windowDestroyedEvent = createEvent("onWindowDestroyed")<WindowDetails>();
const windowActivatedEvent = createEvent("onWindowActivated")<WindowDetails>();
const windowOpenedEvent = createEvent("onWindowOpened")<WindowDetails>();
const windowRouteChanged = createEvent("onWindowRouteChanged")<WindowDetails>();
const windowStartRouteChanged = createEvent("onWindowStartRouteChanged")<WindowDetails>();
const windowTitleChanged = createEvent("onWindowTitleChanged")<WindowDetails>();

const events = {
  windowRegisteredEvent,
  windowDestroyedEvent,

  windowActivatedEvent,

  windowOpenedEvent,

  windowRouteChanged,
  windowStartRouteChanged,

  windowTitleChanged,
};

export default events;
