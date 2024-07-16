import { fetchCoasterStats } from "@/data-provider/coastercloud/provider/ride-statistics-provider";
import {
  AttractionRide,
  RideStatistic,
} from "@/data-provider/coastercloud/types/TypeRideStatistics";

import ScoreCard from "./score-card";
import PoweredByCoasterCloud from "./powered-by";
import initTranslations from "@/components/translate/i18n";
import AppLink from "@/components/os/app-link";

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
    namespaces: ["coaster"],
  });

  const coasterStats = await fetchCoasterStats();

  return (
    <div className="relative flex-col rounded-lg bg-white p-2 drop-shadow-lg dark:bg-neutral-800">
      <h2 className="pb-1 text-xl">{t("coasterStats")}</h2>
      <AppLink href={`/${lng}/coaster`} id="coaster">
        <table className="min-w-full">
          <tbody>
            <tr>
              <td>{t("counts")}:</td>
              <td>{`${getCount(coasterStats, "totalCoasterAttractions")}`}</td>
            </tr>
            <tr>
              <td>{t("rides")}:</td>
              <td>{`${getCount(coasterStats, "totalRides")}`}</td>
            </tr>
            <tr>
              <td>{t("visits")}:</td>
              <td>{`${getCount(coasterStats, "totalVisits")}`}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex place-content-center">
          <ScoreCard
            title={t("mausAuChocolatScore")}
            attraction={coasterStats?.parkVisits.items[0]}
            lng={lng}
            className="mt-2"
          />
        </div>
      </AppLink>

      <div className="pb-2 pr-2">
        <PoweredByCoasterCloud />
      </div>
    </div>
  );
}
