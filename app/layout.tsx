import { Inter } from "next/font/google";
import clsx from "clsx";

import PageBaseConfiguration from "@/configuration";

import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata() {
  const config = PageBaseConfiguration();

  return {
    title: {
      default: config.title,
      template: `%s - ${config.title}`,
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
  const classes = clsx(
    inter.className,
    "overflow-hidden overscroll-none bg-neutral-200 dark:bg-neutral-900",
  );

  return (
    <html suppressHydrationWarning>
      <body className={classes}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
