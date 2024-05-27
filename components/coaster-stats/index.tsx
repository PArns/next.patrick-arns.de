import Image from "next/image";

import { fetchCoasterStats } from "@/data-provider/coastercloud/provider/ride-statistics-provider";
import {
  Attraction,
  AttractionRide,
  RideStatistic,
} from "@/data-provider/coastercloud/types/TypeRideStatistics";

import CoasterCloudLogo from "@/public/images/CoasterCloud.png";
import initTranslations from "../translate/i18n";

export function getCount(stats: RideStatistic | null, key: string): Number {
  if (stats === null) return 0;

  const count = stats.counts.find((item) => item.key === key);
  return count ? count.value : 0;
}

export function getRideFact(stats: RideStatistic | null, key: string): string {
  if (stats === null) return "";

  const item = stats.rideFacts.find((item) => item.key === key);
  return item ? item.valueAsString : "";
}

export function getAttractionStats(
  stats: RideStatistic | null,
  id: string,
): AttractionRide | undefined {
  if (stats === null) return undefined;

  return stats.attractionRides.items.find((item) => item.attraction.id === id);
}

export function getAttractionImage(attraction: Attraction | undefined) {
  if (!attraction)
    return {
      url: "",
      copyright: "",
    };

  return {
    url: attraction.images[0].url.replaceAll("square80", "square500"),
    copyright: `(c) ${attraction.images[0].license.name} - ${attraction.images[0].contributor.username}`,
  };
}

export default async function CoasterStats({ lng }: { lng: string }) {
  const { t } = await initTranslations({
    locale: lng,
    namespaces: ["coasterStats"],
  });

  const coasterStats = await fetchCoasterStats();
  const coasterWithHighestCount = coasterStats?.attractionRides.items[0];

  const mausAuChocolat = getAttractionStats(
    coasterStats,
    "d466eaf7-4e89-4112-b4b2-1ad4584a62ce",
  );

  const locale = lng == "en" ? "en-US" : "de-DE"

  return (
    <div className="relative">
      <h2 className="pb-1 text-xl">{t("coasterStats")}</h2>
      <table className="min-w-full">
        <tbody>
          <tr>
            <td>{t("visits")}:</td>
            <td>{`${getCount(coasterStats, "totalVisits")}`}</td>
          </tr>
          <tr>
            <td>{t("countries")}:</td>
            <td>{`${getCount(coasterStats, "totalCountries")}`}</td>
          </tr>
          <tr>
            <td>{t("parks")}:</td>
            <td>{`${getCount(coasterStats, "totalParks")}`}</td>
          </tr>
          <tr>
            <td>{t("counts")}:</td>
            <td>{`${getCount(coasterStats, "totalCoasterAttractions")}`}</td>
          </tr>
          <tr>
            <td>{t("rides")}:</td>
            <td>{`${getCount(coasterStats, "totalRides")}`}</td>
          </tr>
          <tr>
            <td>{t("inversions")}:</td>
            <td>{`${getRideFact(coasterStats, "totalRideInversions")}`}</td>
          </tr>
          <tr>
            <td>{t("length")}:</td>
            <td>{`${getRideFact(coasterStats, "totalRideLength")}`}</td>
          </tr>
          <tr>
            <td>{t("time")}:</td>
            <td>{`${getRideFact(coasterStats, "totalDuration")}`}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-2 flex flex-col">
        <div>
          <h3 className="mb-1">{t("mausAuChocolatScore")}</h3>
        </div>
        <div className="relative">
          <Image
            src={getAttractionImage(mausAuChocolat?.attraction).url}
            alt={mausAuChocolat?.attraction.name || "Coaster"}
            title={getAttractionImage(mausAuChocolat?.attraction).copyright}
            width={250}
            height={190}
            className="rounded-lg"
          />
          <div
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
            title={getAttractionImage(mausAuChocolat?.attraction).copyright}
          >
            <div className="text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {mausAuChocolat?.highScore?.toLocaleString(locale)}
            </div>
          </div>
        </div>
        <div className="w-full text-center text-sm text-neutral-700 dark:text-neutral-300">
          {mausAuChocolat?.attraction.name}
        </div>
      </div>

      <div className="mt-2 flex flex-col">
        <div>
          <h3 className="mb-1">{t("mostCounts")}</h3>
        </div>
        <div className="relative">
          <Image
            src={getAttractionImage(coasterWithHighestCount?.attraction).url}
            alt={coasterWithHighestCount?.attraction.name || "Coaster"}
            title={
              getAttractionImage(coasterWithHighestCount?.attraction).copyright
            }
            width={250}
            height={190}
            className="rounded-lg"
          />
          <div
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
            title={
              getAttractionImage(coasterWithHighestCount?.attraction).copyright
            }
          >
            <div className="text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {coasterWithHighestCount?.totalRides.toLocaleString(locale)}
            </div>
          </div>
        </div>
        <div className="w-full text-center text-sm text-neutral-700 dark:text-neutral-300">
          {coasterWithHighestCount?.attraction.name}
        </div>
      </div>

      <div className="mb-5" />

      <a
        className="absolute -bottom-2 -right-2 flex w-full place-content-end pt-2 text-xs text-neutral-500"
        href="https://coaster.cloud"
        target="_blank"
        title="Powered by coaster.cloud"
      >
        <div>Powered by</div>
        <div>
          <Image
            src={CoasterCloudLogo}
            alt="coaster.cloud Logo"
            width={20}
            className="-mt-1 ml-1 grayscale"
          />
        </div>
      </a>
    </div>
  );
}
