import Image from "next/image";

import { BlogTeaserSpecific } from "@/components/blog/blog-teaser";
import initTranslations from "@/components/translate/i18n";
import TypeWriter from "@/components/type-writer";

import JumbotronPic from "@/public/images/profilePic-exempt.png";
import { getPageAlternates } from "@/helper/localization";

import { WindowTitle } from "@/components/os/windowManager";
import TimeLine, { TimeLineItem } from "@/components/timeline";

import CyberGhost1 from "@/public/cyberghost/cyberghost1.jpg";
import CyberGhost2 from "@/public/cyberghost/cyberghost2.png";
import CyberGhost3 from "@/public/cyberghost/cyberghost3.png";
import CyberGhost35 from "@/public/cyberghost/cyberghost35.png";
import CyberGhost4 from "@/public/cyberghost/cyberghost4.png";
import CyberGhost5 from "@/public/cyberghost/cyberghost5.png";
import CyberGhost55 from "@/public/cyberghost/cyberghost55.png";
import CyberGhost6 from "@/public/cyberghost/cyberghost6.png";
import CyberGhost7 from "@/public/cyberghost/cyberghost7.png";
import CyberGhost8 from "@/public/cyberghost/cyberghost8.png";

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

      <div className="flex pb-4">
        <div className="flex w-full flex-col rounded-md bg-white p-4 dark:bg-neutral-800">
          <h1 className="mb-2 text-2xl">More to come!</h1>
          <p>This page is under construction ...</p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex w-full flex-col rounded-md bg-white p-4 dark:bg-neutral-800">
          <h1 className="mb-2 text-2xl">
            CyberGhost - vom Keller-Startup zum Unicorn
          </h1>
          <p>Lorem Ipsum</p>
        </div>

        <TimeLine className="px-6 py-8 @2xl:px-12">
          <TimeLineItem title="SimonTools CyberGhost" time={"2003"} icon="home">
            <div className="w-full">
              <Image
                src={CyberGhost1}
                width={400}
                height={400}
                alt="CyberGhost"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem
            title="SimonTools CyberGhost 2"
            time={"2004"}
            icon="rocket"
          >
            <div className="w-full">
              <Image
                src={CyberGhost2}
                width={400}
                height={400}
                alt="CyberGhost 2004"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem
            title="SimonTools CyberGhost VPN"
            time={"2006"}
            icon="rocket"
          >
            <div className="w-full">
              <Image
                src={CyberGhost3}
                width={400}
                height={400}
                alt="SomonTools CyberGhost VPN"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem
            title="SimonTools CyberGhost VPN 3.5"
            time={"2008"}
            icon="rocket"
          >
            <div className="w-full">
              <Image
                src={CyberGhost35}
                width={400}
                height={400}
                alt="SomonTools CyberGhost VPN 3.5"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem title="CyberGhost 4" time={"2010"} icon="rocket">
            <div className="w-full">
              <Image
                src={CyberGhost4}
                width={400}
                height={400}
                alt="CyberGhost 4"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem title="CyberGhost 5" time={"2012"} icon="rocket">
            <div className="w-full">
              <Image
                src={CyberGhost5}
                width={400}
                height={400}
                alt="CyberGhost 5"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem title="CyberGhost 5.5" time={"2014"} icon="rocket">
            <div className="w-full">
              <Image
                src={CyberGhost55}
                width={400}
                height={400}
                alt="CyberGhost 5.5"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem title="CyberGhost 6" time={"2016"} icon="rocket">
            <div className="w-full">
              <Image
                src={CyberGhost6}
                width={400}
                height={400}
                alt="CyberGhost 6"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem title="CyberGhost 7" time={"2018"} icon="rocket">
            <div className="w-full">
              <Image
                src={CyberGhost7}
                width={400}
                height={400}
                alt="CyberGhost 7"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem
            title="CyberGhost 8"
            time={"2020"}
            icon="flag"
            isActive={true}
          >
            <div className="w-full">
              <Image
                src={CyberGhost8}
                width={400}
                height={400}
                alt="CyberGhost 6"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>
        </TimeLine>
      </div>

      <BlogTeaserSpecific
        locale={params.lng}
        postId="3L8OVL4Eq4SRF2DPRcGvcR"
        className="pt-4"
      />
    </div>
  );
}
