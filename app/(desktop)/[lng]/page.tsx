import PageBaseConfiguration from "@/configuration";

export async function generateStaticParams() {
  const config = PageBaseConfiguration();
  return config.supportedLocales.map((lng: string) => ({ lng }));
}

export default function Home() {
  return null;
}
