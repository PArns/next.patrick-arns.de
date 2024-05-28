import Image from "next/image";
import { Attraction } from "@/data-provider/coastercloud/types/TypeRideStatistics";
import clsx from "clsx";

export function getAttractionImage(attraction: Attraction) {
  return {
    url: attraction.images[0].url.replaceAll("square80", "square500"),
    copyright: `(c) ${attraction.images[0].license.name} - ${attraction.images[0].contributor.username}`,
  };
}

export default function ScoreCard({
  title,
  attraction,
  score,
  className,
}: {
  title: string;
  attraction: Attraction | undefined;
  score: string | undefined;
  className?: string;
}) {
  if (!attraction) return <></>;

  const attractionImage = getAttractionImage(attraction);
  const classNames = clsx("flex flex-col", className);

  return (
    <div className={classNames}>
      <div>
        <h3 className="mb-1">{title}</h3>
      </div>
      <div className="relative">
        <Image
          src={attractionImage.url}
          alt={attraction.name || "Coaster"}
          title={attractionImage.copyright}
          width={250}
          height={190}
          className="h-28 rounded-lg object-cover"
        />
        <div
          className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
          title={getAttractionImage(attraction).copyright}
        >
          <div className="text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {score}
          </div>
        </div>
      </div>
      <div className="w-full text-center text-sm text-neutral-700 dark:text-neutral-300">
        {attraction.name}
      </div>
    </div>
  );
}
