import client from "@/contentful/client";

import { TypeImageGallerySkeleton } from "@/contentful/types";

import { Entry, LocaleCode } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

import { cache } from "react";

type ImageGalleryEntry = Entry<TypeImageGallerySkeleton, undefined, string>;

export interface ImageGalleries {
  galleries: ImageGallery[];
  total: number;
  skip: number;
  limit: number;
}

export interface ImageGallery {
  name: string;
  slug: string;
  date: Date;
  description: string;
  locale: string;
  teaserImage: any;
  images: any[];
}

// A function to transform a Contentful image gallery
// into our own ImageGallery object.
export function parseContentfulImageGallery(
  imageGalleryEntry?: ImageGalleryEntry,
  locale?: string,
): ImageGallery {
  if (!imageGalleryEntry) {
    return {
      name: "PARSING ERROR",
      slug: "",
      date: new Date(),
      description: "",
      locale: locale || "en",
      teaserImage: null,
      images: [],
    };
  }

  return {
    name: imageGalleryEntry.fields.name || "",
    slug: imageGalleryEntry.fields.slug || "",
    date: new Date(imageGalleryEntry.fields.date ?? ""),
    description: imageGalleryEntry.fields.description || "",
    locale: locale || "en",
    teaserImage: imageGalleryEntry.fields.teaserImage || null,
    images: imageGalleryEntry.fields.images || [],
  };
}

export const GetGalleries = cache(
  async (
    locale: LocaleCode,
    skip: number = 0,
    limit: number = 10,
  ): Promise<ImageGalleries> => {
    let query: Record<string, any> = {
      content_type: "imageGallery",
      order: "-fields.date",
      locale: locale,
      skip: skip,
      include: 1,
    };

    const res = await client.getEntries<TypeImageGallerySkeleton>(query);
    const galleries = res.items.map(
      (galleryEntry) =>
        parseContentfulImageGallery(galleryEntry, locale) as ImageGallery,
    );

    return {
      galleries: galleries,
      total: res.total,
      skip: res.skip,
      limit: res.limit,
    };
  },
);

export const GetBlogPostBySlug = cache(
  async (slug: string, locale: string): Promise<ImageGallery> => {
    const res = await client.getEntries<TypeImageGallerySkeleton>({
      content_type: "imageGallery",
      limit: 1,
      include: 10,
      locale: locale,
      "fields.slug": slug,
    });
    const post = res.items[0];

    return parseContentfulImageGallery(post);
  },
);
