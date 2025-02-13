import GalleryCard from "@/components/gallery/gallery-card";
import { WindowTitle } from "@/components/os/windowManager";
import Translate from "@/components/translate";
import initTranslations from "@/components/translate/i18n";
import { GetGalleries } from "@/data-provider/contentful/provider/gallery-provider";
import Image from "next/image";

import PicturesJumbotron from "@/public/jumbotron/pictures.jpg";
import AboutAuthor from "@/parts/about-author";
import { getPageAlternates } from "@/helper/localization";
import CoasterStats from "@/components/coaster/coaster-stats";

export async function generateMetadata(
  props: {
    params: Promise<{ lng: string; pageNumber: number; tag: string | undefined }>;
  }
) {
  const params = await props.params;
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["gallery"],
  });

  return {
    title: t("title"),
    description: t("subTitle"),
    alternates: getPageAlternates("pictures"),
    openGraph: {
      type: "website",
      description: t("subTitle"),
      locale: params.lng,
    },
  };
}

export default async function Welcome(props: { params: Promise<{ lng: string }> }) {
  const params = await props.params;
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["titles"],
  });

  const imageGalleries = await GetGalleries(params.lng);
  if (!imageGalleries) return null;

  return (
    <div className="flex flex-col p-2 @container">
      <WindowTitle id="pictures" title={t("pictures")} />

      <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat text-center">
        <Image
          className="absolute bottom-0 left-0 right-0 top-0 h-max w-max object-cover"
          src={PicturesJumbotron}
          fill={true}
          alt="Gallery Header"
        />

        <div className="py-8 @md:py-14 @lg:py-20">
          <div className="flex h-full items-center justify-center">
            <div className="rounded-xl border-neutral-500 bg-white/30 p-5 text-white backdrop-blur-md dark:border-neutral-600 dark:bg-neutral-800/50">
              <h1 className="mb-4 text-5xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @lg:text-7xl">
                <Translate id="pictures" locale={params.lng} ns="titles" />
              </h1>
              <h2 className="text-lg font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @md:text-xl @lg:text-2xl">
                <Translate id="subTitle" locale={params.lng} ns="gallery" />
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex w-full flex-col gap-3 @3xl:w-3/4">
          {imageGalleries.galleries.map((gallery) => (
            <GalleryCard gallery={gallery} key={gallery.slug} />
          ))}
        </div>

        <div className="hidden w-1/4 flex-col gap-2 pl-2 @3xl:flex">
          <AboutAuthor lng={params.lng} />
          <CoasterStats lng={params.lng} />
        </div>
      </div>
    </div>
  );
}
