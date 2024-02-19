import type { Metadata } from "next";
import { Inter } from "next/font/google";
import classNames from "classnames";

import PageBaseConfiguration from "@/configuration";

import "./globals.css";
import { getCurrentLocale } from "@/helper/localization";

import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
const config = PageBaseConfiguration();

export const metadata: Metadata = {
  title: {
     default: config.title,
     template: "%s - Patrick-Arns.de"
  },
  description: config.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentLocale = getCurrentLocale();

  const classes = classNames(inter.className, "overflow-hidden");

  return (
    <html lang={currentLocale}>
      <body className={classes}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
