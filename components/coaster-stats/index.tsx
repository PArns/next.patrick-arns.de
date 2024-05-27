import Image from "next/image";

import { fetchCoasterStats } from "@/data-provider/coastercloud/provider/ride-statistics-provider";
import { RideStatistic } from "@/data-provider/coastercloud/types/TypeRideStatistics";

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

export default async function CoasterStats({ lng }: { lng: string }) {
  const { t } = await initTranslations({
    locale: lng,
    namespaces: ["coasterStats"],
  });

  const coasterStats = await fetchCoasterStats();
  const coasterWithHighestCount =
    coasterStats?.attractionRides.items[0].attraction;
  const coasterImageWithHighestCount =
    coasterWithHighestCount?.images[0].url.replaceAll("square80", "square250");
  const coasterImageWithHighestCountCopyRight = `(c) ${coasterWithHighestCount?.images[0].license.name} - ${coasterWithHighestCount?.images[0].contributor.username}`;

  return (
    <div className="relative mb-4">
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
          <h3 className="mb-1">{t("mostCounts")}</h3>
        </div>
        <div>
          <Image
            src={coasterImageWithHighestCount || ""}
            alt={coasterWithHighestCount?.name || "Coaster"}
            title={coasterImageWithHighestCountCopyRight}
            width={250}
            height={190}
            className="rounded-lg"
          />
        </div>
        <div className="w-full text-center text-sm text-neutral-700 dark:text-neutral-300">
          {coasterWithHighestCount?.name}
        </div>
      </div>
      <a
        className="absolute -right-2 flex w-full place-content-end pt-2 text-xs text-neutral-500"
        href="https://coaster.cloud"
        target="_blank"
        title="coaster.cloud"
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
