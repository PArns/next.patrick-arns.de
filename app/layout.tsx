import { Inter } from "next/font/google";
import classNames from "classnames";

import PageBaseConfiguration from "@/configuration";

import "./globals.css";
import {
  getCurrentRoute,
  getCurrentLocale,
  addLocaleToRoute,
  removeLocaleFromRoute,
} from "@/helper/localization";

import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata() {
  const config = PageBaseConfiguration();
  const canonicalUrl = removeLocaleFromRoute(getCurrentRoute());

  let languages: any = {};

  config.supportedLocales.forEach((locale) => {
    languages[locale] = addLocaleToRoute(canonicalUrl, locale);
  });

  return {
    title: {
      default: config.title,
      template: `%s - ${config.title}`,
    },
    description: config.description,
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    generator: "Next.js",
    creator: "Patrick Arns",
    publisher: config.publisher,
    metadataBase: config.baseUrl,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentLocale = getCurrentLocale();

  const classes = classNames(
    inter.className,
    "overflow-hidden overscroll-none",
  );

  return (
    <html lang={currentLocale}>
      <body className={classes}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
