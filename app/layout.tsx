import { Inter } from "next/font/google";
import clsx from "clsx";

import PageBaseConfiguration from "@/configuration";

import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";

import "./globals.css";
import { Metadata } from "next";
import { getLocale } from "@/helper/localization";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata(): Metadata {
  const config = PageBaseConfiguration();

  return {
    title: {
      default: config.title,
      template: `%s | ${config.title}`,
    },
    description: config.description,
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
  const locale = getLocale();
  const classes = clsx(
    inter.className,
    "overflow-hidden overscroll-none bg-neutral-200 dark:bg-neutral-900",
  );

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={classes}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
