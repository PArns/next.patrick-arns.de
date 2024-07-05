import ContentfulImageAsset from "@/components/contentful/image-asset";
import RichTextRenderer from "@/components/contentful/rich-text-renderer";
import initTranslations from "@/components/translate/i18n";
import { getAttractionCountsById } from "@/data-provider/coastercloud/provider/ride-statistics-provider";
import { Count } from "@/data-provider/coastercloud/types/TypeRideStatistics";
import { TopCoaster } from "@/data-provider/contentful/provider/coaster-provider";

export function getCount(counts: Count[] | null, key: string): Number {
  if (counts === null || counts.length === 0) return 0;

  console.log("COUNTS", counts);
  const count = counts.find((item) => item.key === key);
  return count ? count.value : 0;
}

export default async function TopCoasterEntry({
  coaster,
  locale,
}: {
  coaster: TopCoaster;
  locale: string;
}) {
  const { t } = await initTranslations({
    locale: locale,
    namespaces: ["coaster"],
  });

  const attractionCounts = await getAttractionCountsById(
    coaster.coasterCloudId,
  );

  return (
    <div className="relative mx-2 @container/park">
      <div className="hidden h-8 @2xl/park:block"></div>
      <div className="left-0 top-4 z-10 flex w-full drop-shadow-lg @2xl/park:absolute @2xl/park:h-full @2xl/park:w-[290px]">
        <ContentfulImageAsset
          asset={coaster.image}
          alt={coaster.name}
          fill
          className="rounded-lg object-cover"
          sizes="(min-width: 1024px) 17rem"
        />
      </div>
      <div className="flex rounded-lg border border-neutral-400 bg-neutral-100/40 drop-shadow-lg backdrop-blur-sm @2xl/park:backdrop-blur-lg dark:bg-neutral-900/40">
        <div className="hidden w-[285px] flex-none @2xl/park:block" />
        <div className="m-4 grow">
          <h2 className="pb-2 text-2xl font-semibold">
            {t("pos")} {coaster.rank}: {coaster.name}
          </h2>
          <RichTextRenderer document={coaster.description} />

          <div className="text-neutral-700 dark:text-neutral-300">
            {getCount(attractionCounts, "totalRides").toString()} {t("rides")}
          </div>
        </div>
      </div>
    </div>
  );
}
