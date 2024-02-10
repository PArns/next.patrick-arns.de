import type { Metadata } from "next";
import { Inter } from "next/font/google";
import classNames from "classnames";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { headers } from "next/headers";

import PageBaseConfiguration from "@/configuration";

import "./globals.css";

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
  const headersList = headers();
  const currentLocale = headersList.get("x-locale") ?? config.defaultLocale;

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
