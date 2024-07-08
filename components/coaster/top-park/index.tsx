import ContentfulImageAsset from "@/components/contentful/image-asset";
import RichTextRenderer from "@/components/contentful/rich-text-renderer";
import initTranslations from "@/components/translate/i18n";
import { ParkVisit } from "@/data-provider/coastercloud/types/TypeRideStatistics";
import { TopPark } from "@/data-provider/contentful/provider/coaster-provider";
import clsx from "clsx";

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

  const imageClass = clsx(
    "@2xl/park:top-4 flex w-full h-full drop-shadow-lg absolute @2xl/park:h-full @2xl/park:w-[290px] @4xl/park:w-[390px] @2xl/park:z-10",
    { "left-0": +park.rank % 2 !== 0, "right-0": +park.rank % 2 === 0 },
  );

  const spacerClassLeft = clsx("hidden", {
    "flex-none @2xl/park:block @2xl:w-[285px] @4xl:w-[385px]":
      +park.rank % 2 !== 0,
  });

  const spacerClassRight = clsx("hidden", {
    "flex-none @2xl/park:block @2xl:w-[285px] @4xl:w-[385px]":
      +park.rank % 2 === 0,
  });

  return (
    <div className="relative mx-2 @container/park">
      <div className="hidden h-8 @2xl/park:block"></div>
      <div className={imageClass}>
        <ContentfulImageAsset
          asset={park.image}
          alt={park.name}
          fill
          className="rounded-lg object-cover drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.6)]"
          sizes="(min-width: 1024px) 17rem"
          lightbox={true}
        />
      </div>
      <div className="flex rounded-lg border border-neutral-400 bg-neutral-100/40 drop-shadow-lg backdrop-blur-sm @2xl/park:backdrop-blur-lg dark:bg-neutral-900/40">
        <div className={spacerClassLeft} />
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
        <div className={spacerClassRight} />
      </div>
    </div>
  );
}
