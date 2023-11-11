import type { Metadata } from "next";
import { Inter } from "next/font/google";
import classNames from "classnames";

import "./globals.css";

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
      <body className={classes}>{children}</body>
    </html>
  );
}
