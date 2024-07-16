import Image from "next/image";
import {
  Attraction,
  FastestAttraction,
  HighestAttraction,
  LongestAttraction,
  ParkTrip,
  ParkVisit,
  StrongestAttraction,
} from "@/data-provider/coastercloud/types/TypeRideStatistics";
import clsx from "clsx";
import initTranslations from "@/components/translate/i18n";

function isParkVisit(attraction: any): attraction is ParkVisit {
  return (
    typeof attraction === "object" &&
    "park" in attraction &&
    "totalVisits" in attraction &&
    "totalRides" in attraction
  );
}

function isParkTrip(attraction: any): attraction is ParkTrip {
  return (
    typeof attraction === "object" &&
    "park" in attraction &&
    "date" in attraction
  );
}

export function getAttractionImage(
  attraction:
    | Attraction
    | FastestAttraction
    | HighestAttraction
    | StrongestAttraction
    | LongestAttraction
    | ParkVisit
    | ParkTrip,
) {
  if (isParkVisit(attraction) || isParkTrip(attraction)) {
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
    | ParkVisit
    | ParkTrip,
) {
  if (isParkVisit(attraction)) return attraction.park.name;
  else if (isParkTrip(attraction)) return "";
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
    | ParkTrip
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
  const classNames = clsx("flex flex-col", className);

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
    "w-full text-center text-neutral-900 dark:text-neutral-300",
    {
      "text-sm": !big,
      "text-md pt-1": big,
    },
  );

  const scoreValueClassNames = clsx(
    "font-bold text-white text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]",
    {
      "text-3xl": isParkVisit(attraction) && big,
      "text-4xl": !isParkVisit(attraction) && big,
      "text-xl": isParkVisit(attraction) && !big,
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
    <div className="flex">
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
    </div>
  );
}
