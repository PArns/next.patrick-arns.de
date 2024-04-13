import Image from "next/image";

import { BlogTeaserSpecific } from "@/components/blog/blog-teaser";
import initTranslations from "@/components/translate/i18n";
import TypeWriter from "@/components/type-writer";

import JumbotronPic from "@/public/images/profilePic-exempt.png";

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}) {
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["titles"],
  });

  return {
    title: t("aboutMe"),
  };
}

export default function AboutMe({ params }: { params: { lng: string } }) {
  return (
    <div className="@container mx-auto p-4">
      <div className="relative flex flex-row">
        <div className="flex w-full items-center justify-center">
          <div>
            <h1 className="@xl:text-5xl @md:text-3xl text-xl font-bold">
              <div>Life is simple</div>
              <div className="width-32text-clip @md:mt-3 text-sky-500">
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
        <div className="@md:pr-4 w-max">
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
      </article>
    </div>
  );
}
