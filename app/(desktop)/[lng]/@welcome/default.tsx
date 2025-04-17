import Welcome from "@/app/(desktop)/[lng]/@welcome/(.)/welcome/page";

import PageBaseConfiguration from "@/configuration";

export async function generateStaticParams() {
  const config = PageBaseConfiguration();
  return config.supportedLocales.map((lng: string) => ({ lng }));
}

export default Welcome;
