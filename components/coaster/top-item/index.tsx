import ContentfulImageAsset from "@/components/contentful/image-asset";
import RichTextRenderer from "@/components/contentful/rich-text-renderer";
import initTranslations from "@/components/translate/i18n";
import { ParkVisit } from "@/data-provider/coastercloud/types/TypeRideStatistics";
import { TopPark } from "@/data-provider/contentful/provider/coaster-provider";

function getParkVisitsByParkName(
  visits: ParkVisit[],
  parkToFind: string,
): ParkVisit | null {
  let res: ParkVisit | null = null;

  if (!visits) return null;

  visits.forEach((visit) => {
    if (visit.park.name === parkToFind) res = visit;
  });

  return res;
}

export default async function TopParkEntry({
  park,
  parkVisits,
  locale,
}: {
  park: TopPark;
  parkVisits: ParkVisit[];
  locale: string;
}) {
  const { t } = await initTranslations({
    locale: locale,
    namespaces: ["coaster"],
  });

  const parkVisit = getParkVisitsByParkName(parkVisits, park.name);

  return (
    <div className="flex flex-col rounded-lg bg-neutral-200 p-3 drop-shadow-lg @container/park dark:bg-neutral-500">
      <div>
        <h2 className="text-2xl font-semibold">
          {t("pos")} {park.rank}: {park.name}
        </h2>
      </div>
      <div className="flex w-full flex-row gap-2 pt-1 @lg/park:gap-4">
        <div className="relative h-32 min-w-32 @lg/park:h-64 @lg/park:min-w-64">
          <ContentfulImageAsset
            asset={park.image}
            alt={park.name}
            fill
            className="rounded-lg object-cover"
            sizes="(min-width: 1024px) 16rem, 8rem"
          />
        </div>
        <div className="flex h-auto w-max flex-col">
          <div className="h-full">
            <RichTextRenderer document={park.description} />
          </div>
          {parkVisit && (
            <div className="text-neutral-700 dark:text-neutral-300 pt-3">
              {parkVisit.totalVisits} {t("visits")} - {parkVisit.totalRides}{" "}
              {t("rides")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
