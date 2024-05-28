import Image from "next/image";
import initTranslations from "@/components/translate/i18n";
import { Metadata } from "next";

import PageBaseConfiguration from "@/configuration";

import { fetchCoasterStats } from "@/data-provider/coastercloud/provider/ride-statistics-provider";

import CoasterImage from "@/public/jumbotron/coaster.jpg";
import PoweredByCoasterCloud from "@/components/coaster-stats/powered-by";

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const config = PageBaseConfiguration();

  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["coaster"],
  });

  return {
    metadataBase: config.baseUrl,
    title: t("title"),
    description: t("subTitle"),
    openGraph: {
      type: "article",
      url: `${config.baseUrl}${params.lng}/coaster`,
      locale: params.lng,
      images: "/public/jumbotron/coaster.jpg",
    },
  };
}

export default async function Coaster({
  params,
}: {
  params: { lng: string };
}) {
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["coaster"],
  });

  const coasterStats = await fetchCoasterStats();

  return (
    <div className="flex w-full flex-col p-2 @container">
      <div className="relative w-full overflow-hidden rounded-lg bg-cover bg-no-repeat text-center @container/header">
        <Image
          src={CoasterImage}
          alt={t("title")}
          fill={true}
          quality={80}
          className="absolute bottom-0 left-0 right-0 top-0 h-max w-max object-cover"
        />
        <div className="py-10 @md/header:py-20 @lg/header:py-28">
          <div className="flex h-full items-center justify-center">
            <div className="text-white">
              <h1 className="mb-2 text-4xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @md/header:text-5xl @lg/header:text-6xl">
                {t("title")}
              </h1>
              <h2 className="text-2xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @md/header:text-3xl @lg/header:text-4xl">
                {t("subTitle")}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 w-full rounded-md bg-white p-4 dark:bg-neutral-800">
        <h3 className="mb-1 text-3xl font-extrabold leading-tight text-neutral-900 dark:text-white lg:text-4xl">
          {t("title")}
        </h3>
        Some whatever
      </div>

      <div className="mt-2 w-full rounded-md bg-white p-4 dark:bg-neutral-800">
        <h3 className="mb-1 text-2xl font-extrabold leading-tight text-neutral-900 dark:text-white lg:text-3xl">
          {t("statistics")}
        </h3>
        <div className="mb-4">
          So ein Freizeitpark-Nerd ist natürlich nur ein richtiger Nerd, wenn er
          auch seine "Counts" zählt. Ein "Count" ist nach offiziellem
          Coaster-Standard jede einzelne Achterbahn, die man gefahren ist.
        </div>
        <div className="mb-4">
          Gezählt werden dürfen nur Achterbahnen, die eine vollständige
          Schienenstrecke haben und einen vollständigen Kreislauf oder eine
          definierte Strecke zurücklegen.
        </div>
        <div className="mb-4">
          Deshalb findet ihr hier alle meine aktuellen Park-Statistiken – stets
          aktuell und über eine der besten Freizeitpark-Apps überhaupt
          mitgezählt:{" "}
          <a
            href="https://coaster.cloud"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Coaster.Cloud
          </a>
        </div>
        <PoweredByCoasterCloud />
      </div>
    </div>
  );
}
