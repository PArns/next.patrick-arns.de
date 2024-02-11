"use client";

import { usePathname } from "next/navigation";
import PageBaseConfiguration from "@/configuration";

import { useEffect, useState } from "react";

import Image from "next/image";
import { Menu } from "@headlessui/react";

interface langEntry {
  locale: string;
  language: string;
  path: string;
}

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const config = PageBaseConfiguration();

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

  useEffect(() => {
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
          <Menu.Button>
            <Image
              src={`/flags/${currentLocale}.png`}
              width={26}
              height={26}
              alt="Language"
              className="pt-[5px] opacity-70 hover:opacity-90"
            />
          </Menu.Button>
          <Menu.Items className="absolute mt-[2px] origin-top-left divide-y divide-gray-100 rounded-md bg-white/90 ring-1 ring-black/5 drop-shadow backdrop-blur-lg focus:outline-none">
            {supportedLocales.map((loc) => (
              <Menu.Item
                as="div"
                key={loc.locale}
                className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black p-1"
              >
                {({ active }) => (
                  <a
                    href={loc.path}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <div className="flex flex-row">
                      <div>
                        <Image
                          src={`/flags/${loc.locale}.png`}
                          width={20}
                          height={12}
                          alt={`Language ${loc.locale}`}
                          className="mr-2 mt-[5px]"
                        />
                      </div>
                      <div>{loc.language}</div>
                    </div>
                  </a>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      )}
    </>
  );
}
