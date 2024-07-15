import Image from "next/image";

import { BlogTeaserSpecific } from "@/components/blog/blog-teaser";
import initTranslations from "@/components/translate/i18n";
import TypeWriter from "@/components/type-writer";

import JumbotronPic from "@/public/images/profilePic-exempt.png";
import { getPageAlternates } from "@/helper/localization";

import { WindowTitle } from "@/components/os/windowManager";

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
export default async function AboutMe({ params }: { params: { lng: string } }) {
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["titles"],
  });

  return (
    <div className="flex flex-col p-2 @container">
      <WindowTitle id="me" title={t("aboutMe")} />

      <div className="relative w-full overflow-hidden rounded-lg bg-cover bg-no-repeat text-center">
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
      </div>

      <div className="flex gap-2">
        <div className="flex w-full flex-col rounded-md bg-white p-4 dark:bg-neutral-800">
          <h1 className="mb-2 text-2xl">More to come!</h1>
          <p>This page is under construction ...</p>
        </div>
      </div>

      <BlogTeaserSpecific locale={params.lng} postId="3L8OVL4Eq4SRF2DPRcGvcR" className="pt-4" />
    </div>
  );
}
