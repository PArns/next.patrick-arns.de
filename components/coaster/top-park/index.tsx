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
    <div className="relative mx-2 @container/park">
      <div className="hidden h-8 @2xl/park:block"></div>
      <div className="left-0 @2xl/park:top-4 flex w-full h-full drop-shadow-lg absolute @2xl/park:h-full @2xl/park:w-[290px] @4xl/park:w-[390px] @2xl/park:z-10">
        <ContentfulImageAsset
          asset={park.image}
          alt={park.name}
          fill
          className="rounded-lg object-cover"
          sizes="(min-width: 1024px) 17rem"
        />
      </div>
      <div className="flex rounded-lg border border-neutral-400 bg-neutral-100/40 drop-shadow-lg backdrop-blur-sm @2xl/park:backdrop-blur-lg dark:bg-neutral-900/40">
        <div className="hidden @2xl:w-[285px] @4xl:w-[385px] flex-none @2xl/park:block" />
        <div className="m-4 grow">
          <h2 className="pb-2 text-2xl font-semibold">
            {t("pos")} {park.rank}: {park.name}
          </h2>
          <RichTextRenderer document={park.description} />

          {parkVisit && (
            <div className="text-neutral-700 dark:text-neutral-300">
              {parkVisit.totalVisits} {t("visits")} - {parkVisit.totalRides}{" "}
              {t("rides")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
