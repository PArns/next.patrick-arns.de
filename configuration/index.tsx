import initTranslations from "@/components/translate/i18n";
import { ReactNode } from "react";

export interface SlotProps {
  coaster: ReactNode;
  blog: ReactNode;
  welcome: ReactNode;
  pictures: ReactNode;
  me: ReactNode;
}

export interface DesktopWindowConfig {
  width: string;
  maxWidth: number;
  height?: string;
  route: string;
  key: keyof SlotProps;
  title: string;
  icon: string;
  isInitiallyOpen?: boolean;
}

export default function PageBaseConfiguration() {
  return {
    title: "Patrick Arns",
    description: "Coming soon ...",
    baseUrl: new URL("https://arns.dev"),
    publisher: "Patrick Arns",
    supportedLocales: ["de", "en"],
    defaultLocale: "en",
    blogPostsPerPage: 5,
    redirects: {
      "/": "/{lng}/welcome",
      "/en": "/en/welcome",
      "/de": "/de/welcome",
      "/coaster": "/{lng}/coaster",
      "/pictures": "/{lng}/pictures",
      "/blog": "/{lng}/blog",
      "/me": "/{lng}/me",
      "/welcome": "/{lng}/welcome",
    },
  };
}

export async function RegisteredDesktopWindows(
  lang: string,
): Promise<DesktopWindowConfig[]> {
  const { t } = await initTranslations({
    locale: lang,
    namespaces: ["titles"],
  });

  return [
    {
      width: "70%",
      maxWidth: 1024,
      route: "/welcome",
      key: "welcome",
      title: t("welcome"),
      icon: "/appicons/welcome-back.png",
      isInitiallyOpen: true,
    },
    {
      width: "70%",
      maxWidth: 1600,
      route: "/me",
      key: "me",
      title: t("me"),
      icon: "/appicons/ausweis.png",
    },
    {
      width: "80%",
      height: "95%",
      maxWidth: 1600,
      route: "/blog",
      key: "blog",
      title: t("blog"),
      icon: "/appicons/blog.png",
    },
    {
      width: "80%",
      height: "95%",
      maxWidth: 1600,
      route: "/pictures",
      key: "pictures",
      title: t("pictures"),
      icon: "/appicons/picture.png",
    },
    {
      width: "80%",
      height: "95%",
      maxWidth: 1600,
      route: "/coaster",
      key: "coaster",
      title: t("coaster"),
      icon: "/appicons/coaster.png",
    },
  ];
}
