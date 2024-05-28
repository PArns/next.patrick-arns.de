import Image from "next/image";
import initTranslations from "@/components/translate/i18n";
import { Metadata } from "next";

import PageBaseConfiguration from "@/configuration";

import { fetchCoasterStats } from "@/data-provider/coastercloud/provider/ride-statistics-provider";

import CoasterImage from "@/public/jumbotron/coaster.jpg";
import PoweredByCoasterCloud from "@/components/coaster-stats/powered-by";
import TranslateSwitch, {
  Translation,
} from "@/components/translate/translate-switch";
import {
  getAttractionStats,
  getCount,
  getRideFact,
} from "@/components/coaster-stats";
import ScoreCard from "@/components/coaster-stats/score-card";
import ScoreStat from "@/components/coaster-stats/score-stat";

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

export default async function Coaster({ params }: { params: { lng: string } }) {
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["coaster"],
  });

  const coasterStats = await fetchCoasterStats();

  const coasterWithHighestCount = coasterStats?.attractionRides.items[0];
  const mausAuChocolat = getAttractionStats(
    coasterStats,
    "d466eaf7-4e89-4112-b4b2-1ad4584a62ce",
  );

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
      </div>

      <div className="mt-2 w-full rounded-md bg-white p-4 dark:bg-neutral-800">
        <h3 className="mb-1 text-2xl font-extrabold leading-tight text-neutral-900 dark:text-white lg:text-3xl">
          {t("statistics")}
        </h3>

        <TranslateSwitch locale={params.lng}>
          <Translation lang="de">
            <div className="mb-4">
              So ein Freizeitpark-Nerd ist natürlich nur ein richtiger Nerd,
              wenn er auch seine &quot;Counts&quot; zählt. Ein Count ist nach
              offiziellem Coaster-Standard jede einzelne Achterbahn, die man
              gefahren ist. Gezählt werden dürfen nur Achterbahnen, die eine
              vollständige Schienenstrecke haben und einen vollständigen
              Kreislauf oder eine definierte Strecke zurücklegen.
            </div>
            <div className="mb-4">
              Deshalb findet ihr hier alle meine aktuellen Park-Statistiken –
              stets aktuell, seit dem 26. Juni 2022. Leider fehlen alle Counts
              vor diesem Datum, da ich am 26. Juni 2022 erst, über eine der
              besten Freizeitpark-Apps:{" "}
              <a
                href="https://coaster.cloud"
                target="_blank"
                className="external"
              >
                Coaster.Cloud
              </a>
              , überhaupt angefangen habe, meine Counts zu zählen.
            </div>
          </Translation>

          <Translation lang="en">
            <div className="mb-4">
              A theme park nerd is, of course, only a true nerd if they also
              count their &quot;counts&quot;. A &quot;count&quot; is, according to the official
              coaster standard, every single roller coaster that one has ridden.
              Only roller coasters that have a complete track and make a full
              circuit or follow a defined route are allowed to be counted.
            </div>
            <div className="mb-4">
              Therefore, here you will find all my current park statistics –
              always up-to-date, since June 26, 2022. Unfortunately, all counts
              before this date are missing because I only started counting my
              counts with one of the best theme park apps ever on June 26, 2022:{" "}
              <a
                href="https://coaster.cloud"
                target="_blank"
                className="external"
              >
                Coaster.Cloud
              </a>
              .
            </div>
          </Translation>
        </TranslateSwitch>
        <hr className="mb-4" />

        <div className="flex-rows flex flex-wrap place-content-center gap-6 pb-6">
          <ScoreStat
            title={t("counts")}
            count={getCount(coasterStats, "totalCoasterAttractions").toString()}
          />
        </div>

        <div className="flex-rows flex flex-wrap place-content-center gap-6 pb-6">
          <ScoreStat
            title={t("visits")}
            count={getCount(coasterStats, "totalVisits").toString()}
          />

          <ScoreStat
            title={t("countries")}
            count={getCount(coasterStats, "totalCountries").toString()}
          />

          <ScoreStat
            title={t("parks")}
            count={getCount(coasterStats, "totalParks").toString()}
          />

          <ScoreStat
            title={t("inversions")}
            count={getRideFact(coasterStats, "totalRideInversions")}
          />

          <ScoreStat
            title={t("length")}
            count={getRideFact(coasterStats, "totalRideLength")}
          />

          <ScoreStat
            title={t("time")}
            count={getRideFact(coasterStats, "totalDuration")}
          />
        </div>

        <div className="flex-rows flex flex-wrap place-content-center gap-6">
          <ScoreCard
            title={t("pos1")}
            attraction={coasterStats?.parkVisits.items[0]}
            big={true}
            lng={params.lng}
          />

          <ScoreCard
            title={t("pos2")}
            attraction={coasterStats?.parkVisits.items[1]}
            big={true}
            lng={params.lng}
          />

          <ScoreCard
            title={t("pos3")}
            attraction={coasterStats?.parkVisits.items[2]}
            big={true}
            lng={params.lng}
          />

          <ScoreCard
            title={t("mausAuChocolatScore")}
            attraction={mausAuChocolat?.attraction}
            score={mausAuChocolat?.highScore?.toLocaleString("en-US")}
            big={true}
          />

          <ScoreCard
            title={t("mostCounts")}
            attraction={coasterWithHighestCount?.attraction}
            score={coasterWithHighestCount?.totalRides.toLocaleString("en-US")}
            big={true}
          />

          <ScoreCard
            title={t("fastestAttraction")}
            attraction={coasterStats?.fastestRide.items[0].attraction}
            score={
              coasterStats?.fastestRide.items[0].attraction.attribute
                .valueAsString
            }
            big={true}
          />

          <ScoreCard
            title={t("longestRide")}
            attraction={coasterStats?.longestRide.items[0].attraction}
            score={
              coasterStats?.longestRide.items[0].attraction.attribute
                .valueAsString
            }
            big={true}
          />

          <ScoreCard
            title={t("highestRide")}
            attraction={coasterStats?.highestRide.items[0].attraction}
            score={
              coasterStats?.highestRide.items[0].attraction.attribute
                .valueAsString
            }
            big={true}
          />

          <ScoreCard
            title={t("strongestRide")}
            attraction={coasterStats?.strongestRide.items[0].attraction}
            score={
              coasterStats?.strongestRide.items[0].attraction.attribute
                .valueAsString
            }
            big={true}
          />
        </div>
        <PoweredByCoasterCloud />
      </div>
    </div>
  );
}
