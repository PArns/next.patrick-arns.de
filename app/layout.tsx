import type { Metadata } from "next";
import { Inter } from "next/font/google";
import classNames from "classnames";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import PageBaseConfiguration from "@/configuration";

import "./globals.css";
import { getCurrentLocale } from "@/helper/localization";

const inter = Inter({ subsets: ["latin"] });
const config = PageBaseConfiguration();

export const metadata: Metadata = {
  title: config.title,
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
        <SpeedInsights />
      </body>
    </html>
  );
}
