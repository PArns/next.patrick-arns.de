import ContentfulImageAsset from "@/components/contentful/image-asset";
import RichTextRenderer from "@/components/contentful/rich-text-renderer";
import initTranslations from "@/components/translate/i18n";
import { getAttractionCountsById } from "@/data-provider/coastercloud/provider/ride-statistics-provider";
import { Count } from "@/data-provider/coastercloud/types/TypeRideStatistics";
import { TopCoaster } from "@/data-provider/contentful/provider/coaster-provider";
import clsx from "clsx";

export function getCount(counts: Count[] | null, key: string): Number {
  if (counts === null || counts.length === 0) return 0;

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

  const imageClass = clsx(
    "@2xl/park:top-4 flex w-full h-full drop-shadow-lg absolute @2xl/park:h-full @2xl/park:w-[290px] @4xl/park:w-[390px] @2xl/park:z-10",
    { "left-0": +coaster.rank % 2 !== 0, "right-0": +coaster.rank % 2 === 0 },
  );

  const spacerClassLeft = clsx("hidden", {
    "flex-none @2xl/park:block @2xl:w-[285px] @4xl:w-[385px]":
      +coaster.rank % 2 !== 0,
  });

  const spacerClassRight = clsx("hidden", {
    "flex-none @2xl/park:block @2xl:w-[285px] @4xl:w-[385px]":
      +coaster.rank % 2 === 0,
  });

  return (
    <div className="relative mx-2 @container/park">
      <div className="hidden h-8 @2xl/park:block"></div>
      <div className={imageClass}>
        <ContentfulImageAsset
          asset={coaster.image}
          alt={coaster.name}
          fill
          className="rounded-lg object-cover"
          sizes="(min-width: 1024px) 17rem"
        />
      </div>
      <div className="flex rounded-lg border border-neutral-400 bg-neutral-100/40 drop-shadow-lg backdrop-blur-sm @2xl/park:backdrop-blur-lg dark:bg-neutral-900/40">
        <div className={spacerClassLeft} />
        <div className="m-4 grow">
          <h2 className="pb-2 text-2xl font-semibold">
            {t("pos")} {coaster.rank}: {coaster.name}
          </h2>
          <RichTextRenderer document={coaster.description} />

          <div className="text-neutral-700 dark:text-neutral-300">
            {getCount(attractionCounts, "totalRides").toString()} {t("rides")}
          </div>
        </div>
        <div className={spacerClassRight} />
      </div>
    </div>
  );
}
