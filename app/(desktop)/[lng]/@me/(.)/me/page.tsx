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
    <div className="container mx-auto p-4">
      <div className="flex flex-row relative">
        <div className="w-full flex items-center justify-center">
          <div>
            <h1 className="lg:text-5xl text-2xl font-bold">
              Life is simple
              <br />
              <span className="text-sky-500">
                <TypeWriter
                  words={["Eat,", "Sleep,", "Code,", "Amusement Parks", "& Repeat!"]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>
          </div>
        </div>
        <div className="w-full pr-4">
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
