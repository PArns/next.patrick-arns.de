import type { Metadata } from "next";
import { Inter } from "next/font/google";
import classNames from "classnames";

import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

import Desktop from "@/components/os/desktop";

import UnderConstruction from "./_apps/underconstruction";
import Blog from "./_apps/blog";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patrick Arns",
  description: "Coming soon ...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const classes = classNames(inter.className, "overflow-hidden");

  return (
    <html lang="en">
      <body className={classes}>
        <Desktop>
          <Blog />
          <UnderConstruction />
        </Desktop>
        <Analytics />
      </body>
    </html>
  );
}
