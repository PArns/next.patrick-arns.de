import Image from "next/image";

import { BlogTeaserSpecific } from "@/components/blog/blog-teaser";
import initTranslations from "@/components/translate/i18n";
import TypeWriter from "@/components/type-writer";

import JumbotronPic from "@/public/images/profilePic-exempt.png";
import { getPageAlternates } from "@/helper/localization";
import {
  RideStatistic,
  fetchCoasterStats,
} from "@/data-provider/coastercloud/provider/ride-statistics-provider";

export async function generateMetadata({
  params,
}: {
  params: { lng: string; pageNumber: number; tag: string | undefined };
}) {
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["titles"],
  });

  return {
    title: t("aboutMe"),
    alternates: getPageAlternates("me"),
    openGraph: {
      type: "website",
      locale: params.lng,
    },
  };
}

export function getCount(stats: RideStatistic | null, key: String): Number {
  if (stats === null) return 0;

  const count = stats.counts.find((item) => item.key === key);
  return count ? count.value : 0;
}

export default async function AboutMe({ params }: { params: { lng: string } }) {
  const coasterStats = await fetchCoasterStats();

  return (
    <div className="mx-auto p-4 @container">
      <div className="relative flex flex-row">
        <div className="flex w-full items-center justify-center">
          <div>
            <h1 className="text-xl font-bold @md:text-3xl @xl:text-5xl">
              <div>Life is simple</div>
              <div className="width-32text-clip text-sky-500 @md:mt-3">
                <TypeWriter
                  words={[
                    "Eat,",
                    "Sleep,",
                    "Code,",
                    "Amusement Parks",
                    "& Repeat!",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </div>
            </h1>
          </div>
        </div>
        <div className="w-max @md:pr-4">
          <Image
            src={JumbotronPic}
            alt="Patrick"
            height={500}
            placeholder="blur"
          />
        </div>
      </div>
      <article className="rounded-md bg-white p-4 dark:bg-neutral-800">
        <h1 className="mb-2 text-2xl">More to come!</h1>
        <p>This page is under construction ...</p>
        <br />
        <BlogTeaserSpecific
          locale={params.lng}
          postId="3L8OVL4Eq4SRF2DPRcGvcR"
        />

        <h2>Coaster Stats</h2>
        <div className="flex flex-col">
          <div>Parks: {`${getCount(coasterStats, "totalParks")}`}</div>
          <div>Rides: {`${getCount(coasterStats, "totalRides")}`}</div>
          <div>Visits: {`${getCount(coasterStats, "totalVisits")}`}</div>
        </div>
      </article>
    </div>
  );
}
