import Image from "next/image";

import { fetchCoasterStats } from "@/data-provider/coastercloud/provider/ride-statistics-provider";
import {
  AttractionRide,
  RideStatistic,
} from "@/data-provider/coastercloud/types/TypeRideStatistics";

import CoasterCloudLogo from "@/public/images/CoasterCloud.png";
import initTranslations from "../translate/i18n";
import ScoreCard from "./score-card";
import AppLink from "../os/app-link";
import PoweredByCoasterCloud from "./powered-by";

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

  const locale = lng == "en" ? "en-US" : "de-DE";

  return (
    <div className="relative">
      <h2 className="pb-1 text-xl">{t("coasterStats")}</h2>
      <AppLink href={`/${lng}/coaster`} id="coaster">
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

        <ScoreCard
          title={t("mausAuChocolatScore")}
          attraction={mausAuChocolat?.attraction}
          score={mausAuChocolat?.highScore?.toLocaleString(locale)}
          className="mt-2"
        />

        <ScoreCard
          title={t("mostCounts")}
          attraction={coasterWithHighestCount?.attraction}
          score={coasterWithHighestCount?.totalRides.toLocaleString(locale)}
          className="mt-2"
        />
      </AppLink>

      <PoweredByCoasterCloud />
    </div>
  );
}
