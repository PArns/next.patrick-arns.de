import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

import BlogHeader from "@/components/blog/blog-header";
import { getImageSource } from "@/components/contentful/image-asset";
import { LanguageAlternates } from "@/components/os/language-switcher";
import { WindowTitle } from "@/components/os/windowManager";
import PhotoGallery, { GalleryPhoto } from "@/components/photo-gallery";
import Translate from "@/components/translate";
import PageBaseConfiguration from "@/configuration";
import { GetGalleryBySlug } from "@/data-provider/contentful/provider/gallery-provider";

import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lng: string };
}): Promise<Metadata> {
  const config = PageBaseConfiguration();
  const gallery = await GetGalleryBySlug(params.slug, params.lng);
  if (!gallery) return {};

  const alternates: AlternateURLs = {
    languages: {},
  };

  if (gallery.alternativeSlugs && alternates.languages) {
    for (const slugIndex in gallery.alternativeSlugs) {
      const slug = gallery.alternativeSlugs[slugIndex];

      if (slugIndex == "de" || slugIndex == "en")
        alternates.languages[slugIndex] =
          `/${slugIndex}/pictures/gallery/${slug}`;
      else {
        console.log("WARNING! NON SUPPORTED LANGUAGE FOR ALTERNATIVES!!!");
      }
    }
  }

  return {
    metadataBase: config.baseUrl,
    title: gallery.name,
    description: gallery.description,
    alternates: alternates,
    openGraph: {
      type: "article",
      publishedTime: gallery.date.toISOString(),
      url: `${config.baseUrl}${params.lng}/pictures/gallery/${params.slug}`,
      locale: params.lng,
      images: [
        { url: getImageSource(gallery.teaserImage, 800), width: 800 },
        { url: getImageSource(gallery.teaserImage, 1800), width: 1800 },
      ],
    },
  };
}

export default async function GalleryOverlay({
  params,
}: {
  params: { slug: string; lng: string };
}) {
  const gallery = await GetGalleryBySlug(params.slug, params.lng);
  if (!gallery) redirect(`/${params.lng}/pictures`);

  const alternates: any = {};

  if (gallery.alternativeSlugs) {
    for (const slugIndex in gallery.alternativeSlugs) {
      const slug = gallery.alternativeSlugs[slugIndex];
      alternates[slugIndex as string] =
        `/${slugIndex}/pictures/gallery/${slug}`;
    }
  }

  let galleryImages: GalleryPhoto[] = [];

  gallery.images.map((image: any) => {
    galleryImages.push({
      src: getImageSource(image, 400),
      lightboxImageSrc: getImageSource(image, 1200),
      alt: image.description,
      title: image.title,
      width: image.width,
      height: image.height,
    });
  });

  return (
    <div className="flex w-full flex-col p-2">
      <WindowTitle id="pictures" title={`${gallery.name}`} />
      <LanguageAlternates alternates={alternates} />
      <BlogHeader title={gallery.name} backgroundImage={gallery.teaserImage} />

      <div className="mt-2 w-full rounded-md bg-white p-4 dark:bg-neutral-800">
        <h3 className="mb-1 text-3xl font-extrabold leading-tight text-neutral-900 dark:text-white lg:text-4xl">
          {gallery.name}
        </h3>
        <h4 className="mb-4 leading-tight text-neutral-900 dark:text-white">
          {gallery.description}
        </h4>
        <PhotoGallery photos={galleryImages} />
      </div>

      <div className="mr-1 mt-2 flex flex-nowrap text-neutral-800">
        <Link
          href={`/${params.lng}/pictures`}
          className="rounded bg-sky-400 px-4 py-2 font-semibold text-white transition hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700"
        >
          <div className="flex flex-nowrap">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 pr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </div>
            <div>
              <Translate id="back" ns="gallery" locale={params.lng} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
