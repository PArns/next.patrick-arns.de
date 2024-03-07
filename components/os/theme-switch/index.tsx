import * as React from "react";

import { useTheme } from "next-themes";
import { Menu, Tab } from "@headlessui/react";
import { useState, useEffect } from "react";

import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

import classNames from "classnames";

export function ThemeEntry({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          className,
          "rounded-lg text-sm font-medium",
          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
          {
            "bg-neutral-800 text-white shadow dark:bg-white dark:text-black":
              selected,
            "text-neutral-800 hover:bg-black/[0.12] hover:text-black dark:text-blue-100 dark:hover:bg-white/[0.12] dark:hover:text-white":
              !selected,
          },
        )
      }
    >
      <div className="flex w-min gap-1 p-2">{children}</div>
    </Tab>
  );
}

export function ThemeSwitch() {
  const indexToTheme = function (index: number) {
    switch (index) {
      case 0:
        return "system";
      case 2:
        return "dark";
      case 1:
        return "light";
    }

    return "system";
  };

  const themeToIndex = function (theme?: string) {
    switch (theme) {
      case "system":
        return 0;
      case "dark":
        return 2;
      case "light":
        return 1;
    }

    return 0;
  };

  const { theme, setTheme } = useTheme();
  const [themeIndex, setThemeIndex] = useState<number>(themeToIndex(theme));

  useEffect(() => {
    setTheme(indexToTheme(themeIndex));
  }, [themeIndex]);

  return (
    <div className="w-full">
      <Tab.Group selectedIndex={themeIndex} onChange={setThemeIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-neutral-900/20 p-1">
          <ThemeEntry>
            <ComputerDesktopIcon className="h-5 w-5" />
          </ThemeEntry>
          <ThemeEntry>
            <SunIcon className="h-5 w-5" />
          </ThemeEntry>
          <ThemeEntry>
            <MoonIcon className="h-5 w-5" />
          </ThemeEntry>
        </Tab.List>
      </Tab.Group>
    </div>
  );
}

export default function ThemeSwitcher() {
  return (
    <Menu>
      <Menu.Button className="mr-2 h-full w-5 opacity-70 hover:opacity-90">
        <LightBulbIcon className="h-5 w-5" />
      </Menu.Button>

      <Menu.Items className="absolute right-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white/80 ring-1 ring-black/5 drop-shadow-lg focus:outline-none dark:bg-neutral-800/80 dark:ring-white/5">
        <ThemeSwitch />
      </Menu.Items>
    </Menu>
  );
}
