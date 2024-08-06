"use client";

import { usePathname } from "next/navigation";
import PageBaseConfiguration from "@/configuration";

import { useEffect, useState } from "react";

import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { createEvent } from "react-event-hook";
import clsx from "clsx";

const setAlternativeLanguages = createEvent("onAlternativeLanguagesAvailable")<
  Array<alternativeLanguage>
>();

interface langEntry {
  locale: string;
  language: string;
  path: string;
}

interface alternativeLanguage {
  locale: string;
  path: string;
}

export function LanguageAlternates({ alternates }: { alternates: any }) {
  const languages = [];

  for (const lang in alternates) {
    const entry = {
      locale: lang as string,
      path: alternates[lang] as string,
    };

    languages.push(entry);
  }

  setAlternativeLanguages.emitOnAlternativeLanguagesAvailable(languages);
  return null;
}

export default function LanguageSwitcher() {
  const pathName = usePathname();

  const [currentLocale, setCurrentLocale] = useState<string>("");
  const [supportedLocales, setSupportedLocales] = useState<Array<langEntry>>(
    [],
  );

  function getLocaleName(locale: string): string {
    switch (locale) {
      case "de":
        return "Deutsch";
      case "en":
        return "English";
      default:
        return "UNKNOWN LANGUAGE!";
    }
  }

  setAlternativeLanguages.useOnAlternativeLanguagesAvailableListener(
    (alternatives) => {
      const altEntries: Array<langEntry> = [];

      alternatives.forEach((l) => {
        const entry = {
          locale: l.locale,
          language: getLocaleName(l.locale),
          path: l.path,
        };

        altEntries.push(entry);
      });

      setTimeout(() => {
        if (altEntries.length !== 0) setSupportedLocales(altEntries);
      });
    },
  );

  useEffect(() => {
    const config = PageBaseConfiguration();

    const pathRegEx = /\/[a-z]{2}\/(.*)/gm;
    const match = Array.from(pathName.matchAll(pathRegEx), (m) => m[1]);

    let langUrls: langEntry[] = [];

    config.supportedLocales.map((supportedLocale) => {
      if (match !== null && match.length == 1) {
        // Language Array ...
        const langUrl: langEntry = {
          locale: supportedLocale,
          language: getLocaleName(supportedLocale),
          path: `/${supportedLocale}/${match[0]}`,
        };

        langUrls.push(langUrl);
      } else {
        // Language Array ...
        const langUrl: langEntry = {
          locale: supportedLocale,
          language: getLocaleName(supportedLocale),
          path: `/${supportedLocale}`,
        };

        langUrls.push(langUrl);
      }

      // Get current locale ...
      if (pathName.startsWith(`/${supportedLocale}/`)) {
        setCurrentLocale(supportedLocale);
      } else if (
        pathName === `/${supportedLocale}/` ||
        pathName === `/${supportedLocale}`
      ) {
        setCurrentLocale(supportedLocale);
      }
    });

    setSupportedLocales(langUrls);
  }, [pathName]);

  return (
    <>
      {currentLocale && (
        <Menu>
          <MenuButton>
            {({ active }) => (
              <Image
                src={`/flags/${currentLocale}.png`}
                width={26}
                height={15}
                alt="Language"
                className={clsx(
                  "pt-[5px] hover:opacity-90",
                  active && "opacity-90",
                  !active && "opacity-70",
                )}
              />
            )}
          </MenuButton>

          <MenuItems
            className="mt-[7px] origin-top-right divide-y divide-gray-100/50 rounded-md bg-white/50 ring-1 ring-black/5 drop-shadow-lg backdrop-blur-lg focus:outline-none dark:bg-neutral-800/50 dark:ring-white/5"
            anchor={"bottom"}
          >
            {supportedLocales.map((loc) => (
              <MenuItem
                as="div"
                key={loc.locale}
                className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black p-1"
              >
                {({ focus }) => (
                  <a
                    href={loc.path}
                    className={`${
                      focus
                        ? "bg-sky-500/70 text-white dark:bg-sky-600/70 dark:text-black"
                        : "text-neutral-900"
                    } group flex w-full items-center rounded-md p-2 text-sm dark:text-white`}
                  >
                    <div className="flex flex-row items-center">
                      <div>
                        <Image
                          src={`/flags/${loc.locale}.png`}
                          width={26}
                          height={15}
                          alt={`Language ${loc.locale}`}
                          className="mr-1"
                        />
                      </div>
                      <div>{loc.language}</div>
                    </div>
                  </a>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      )}
    </>
  );
}
