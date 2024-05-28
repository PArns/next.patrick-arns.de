import Image from "next/image";
import {
  Attraction,
  FastestAttraction,
  HighestAttraction,
  LongestAttraction,
  ParkVisit,
  StrongestAttraction,
} from "@/data-provider/coastercloud/types/TypeRideStatistics";
import clsx from "clsx";
import initTranslations from "../translate/i18n";

function isParkVisit(attraction: any): attraction is ParkVisit {
  return (
    typeof attraction === "object" &&
    "park" in attraction &&
    "totalVisits" in attraction &&
    "totalRides" in attraction
  );
}

export function getAttractionImage(
  attraction:
    | Attraction
    | FastestAttraction
    | HighestAttraction
    | StrongestAttraction
    | LongestAttraction
    | ParkVisit,
) {
  if (isParkVisit(attraction)) {
    return {
      url: attraction.park.images[0].url.replaceAll("square80", "square500"),
      copyright: `(c) ${attraction.park.images[0].license.name} - ${attraction.park.images[0].contributor.username}`,
    };
  } else {
    return {
      url: attraction.images[0].url.replaceAll("square80", "square500"),
      copyright: `(c) ${attraction.images[0].license.name} - ${attraction.images[0].contributor.username}`,
    };
  }
}

export function getAttractionName(
  attraction:
    | Attraction
    | FastestAttraction
    | HighestAttraction
    | StrongestAttraction
    | LongestAttraction
    | ParkVisit,
) {
  if (isParkVisit(attraction)) return attraction.park.name;
  return attraction.name;
}

export default async function ScoreCard({
  title,
  attraction,
  score,
  className,
  big,
  lng,
}: {
  title: string;
  attraction:
    | Attraction
    | FastestAttraction
    | HighestAttraction
    | StrongestAttraction
    | LongestAttraction
    | ParkVisit
    | undefined;
  score?: string;
  className?: string;
  big?: boolean;
  lng?: string;
}) {
  if (!attraction) return <></>;

  const { t } = await initTranslations({
    locale: lng || "en",
    namespaces: ["coaster"],
  });

  const attractionImage = getAttractionImage(attraction);
  const classNames = clsx("flex flex-col w-max", className);

  const imageClassNames = clsx(
    "rounded-lg object-cover drop-shadow-lg border border-neutral-500",
    {
      "h-28": !big,
    },
  );

  const headerClassNames = clsx("mb-1", {
    "font-bold": big,
  });

  const attractionNameClassNames = clsx(
    "w-full text-center text-neutral-700 dark:text-neutral-300",
    {
      "text-sm": !big,
      "text-md pt-1": big,
    },
  );

  const scoreValueClassNames = clsx(
    "font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]",
    {
      "text-3xl": isParkVisit(attraction),
      "text-4xl": !isParkVisit(attraction),
    },
  );

  let scoreValue: any = score;
  let name: any = getAttractionName(attraction);

  if (isParkVisit(attraction)) {
    name = (
      <>
        {attraction.totalVisits} {t("visits")} - {attraction.totalRides}{" "}
        {t("rides")}
      </>
    );

    scoreValue = getAttractionName(attraction);
  }

  return (
    <div className={classNames}>
      <div>
        <h3 className={headerClassNames}>{title}</h3>
      </div>
      <div className="relative">
        <Image
          src={attractionImage.url}
          alt={getAttractionName(attraction)}
          title={attractionImage.copyright}
          width={250}
          height={190}
          className={imageClassNames}
        />
        <div
          className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
          title={getAttractionImage(attraction).copyright}
        >
          <div className={scoreValueClassNames}>{scoreValue}</div>
        </div>
      </div>
      <div className={attractionNameClassNames}>{name}</div>
    </div>
  );
}
