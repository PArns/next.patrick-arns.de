"use client";

import { useTheme } from "next-themes";
import {
  Menu,
  MenuButton,
  MenuItems,
  Tab,
  TabGroup,
  TabList,
} from "@headlessui/react";
import { useState, useEffect } from "react";

import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

import clsx from "clsx";

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
        clsx(className, "rounded-lg text-sm font-medium", {
          "bg-neutral-800 text-white shadow-sm dark:bg-white dark:text-black":
            selected,
          "text-neutral-800 hover:bg-black/[0.12] hover:text-black dark:text-blue-100 dark:hover:bg-white/[0.12] dark:hover:text-white":
            !selected,
        })
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
  }, [themeIndex, setTheme]);

  return (
    <div className="w-full">
      <TabGroup selectedIndex={themeIndex} onChange={setThemeIndex}>
        <TabList className="flex space-x-1 rounded-lg p-1">
          <ThemeEntry>
            <ComputerDesktopIcon className="h-5 w-5" />
          </ThemeEntry>
          <ThemeEntry>
            <SunIcon className="h-5 w-5" />
          </ThemeEntry>
          <ThemeEntry>
            <MoonIcon className="h-5 w-5" />
          </ThemeEntry>
        </TabList>
      </TabGroup>
    </div>
  );
}

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mr-2 h-full w-5">
        <LightBulbIcon className="h-5 w-5 opacity-70" />
      </div>
    );
  }

  return (
    <Menu>
      <MenuButton className="mr-2 h-full w-5">
        {({ active }) => (
          <LightBulbIcon
            className={clsx(
              "h-5 w-5 hover:opacity-90",
              active && "opacity-90",
              !active && "opacity-70",
            )}
          />
        )}
      </MenuButton>

      <MenuItems
        anchor={"bottom"}
        className="mt-[1px] origin-top-right divide-y divide-gray-100/50 rounded-md bg-white/50 ring-1 ring-black/5 drop-shadow-lg backdrop-blur-lg focus:outline-hidden dark:bg-neutral-800/50 dark:ring-white/5"
      >
        <ThemeSwitch />
      </MenuItems>
    </Menu>
  );
}
