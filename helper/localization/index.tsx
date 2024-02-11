import { headers } from "next/headers";
import PageBaseConfiguration from "@/configuration";

const getCurrentLocale = () => {
  const config = PageBaseConfiguration();

  const headersList = headers();
  return headersList.get("x-locale") ?? config.defaultLocale;
};

export { getCurrentLocale };
