import { fetchGraphQL } from "@/data-provider/contentful/client";
import { LocaleCode } from "contentful";
import { isValidLocale } from "@/helper/localization";

export interface ImageGalleries {
  galleries: ImageGallery[];
  total: number;
  skip: number;
  limit: number;
}

export interface ImageGallery {
  name: string;
  slug: string;
  alternativeSlugs?: any;
  date: Date;
  description: string;
  locale: string;
  teaserImage: any;
  images: any[];
}

export async function GetGalleries(
  locale: LocaleCode,
  skip: number = 0,
  limit: number = 10,
): Promise<ImageGalleries | null> {
  if (!isValidLocale(locale)) return null;

  const data = await fetchGraphQL(
    `query($limit: Int!, $skip: Int!, $locale: String!) {
      imageGalleryCollection(order: date_DESC, limit: $limit, skip: $skip, locale: $locale) {
          total
          skip
          limit
          items {
            name
            slug
            date
            description
            teaserImage {
              url
            }
          }
        }
      }`,
    { limit: limit, skip: skip, locale: locale },
  );

  const collection = data.data.imageGalleryCollection;

  const galleries: ImageGallery[] = collection.items.map(
    (galleryEntry: any) => {
      return {
        name: galleryEntry.name,
        slug: galleryEntry.slug,
        date: new Date(galleryEntry.date),
        description: galleryEntry.description,
        locale: locale,
        teaserImage: galleryEntry.teaserImage,
      };
    },
  );

  return {
    total: collection.total,
    skip: collection.skip,
    limit: collection.limit,
    galleries: galleries,
  };
}

export async function GetGalleryBySlug(
  slug: string,
  locale: string,
): Promise<ImageGallery | null> {
  if (!isValidLocale(locale)) return null;

  const query = `query($slug: String!, $locale: String!) {
    imageGalleryCollection(where: {slug: $slug}, locale: $locale, limit: 1) {
        items {
          name
          slug
          slugDE: slug(locale: "de")
          slugEN: slug(locale: "en")
          date
          description
          teaserImage {
            url
          }
          imagesCollection {
            items {
              title
              description
              url
              width
              height
            }
          }
        }
      }
    }`;

  const variables = { slug: slug, locale: locale };
  const data = await fetchGraphQL(query, variables);
  const postData = data?.data?.imageGalleryCollection?.items[0];

  if (!postData) return null;

  const gallery: ImageGallery = {
    name: postData.name,
    slug: postData.slug,
    date: new Date(postData.date),
    description: postData.description,
    locale: locale,
    teaserImage: postData.teaserImage,
    images: postData.imagesCollection.items,
    alternativeSlugs: {
      de: postData.slugDE,
      en: postData.slugEN,
    },
  };

  return gallery;
}

export interface GallerySlug {
  slugDE: String;
  slugEN: String;
  publishedAt: Date;
}

export async function GetAllGallerySlugs(): Promise<GallerySlug[]> {
  const query = `query {
    imageGalleryCollection(
        order: date_DESC) {
          items {
            slugDE: slug(locale: "de")
            slugEN: slug(locale: "en")
            date
          }
        }
    }`;

  const data = await fetchGraphQL(query);
  const collection = data.data.imageGalleryCollection;

  const posts: GallerySlug[] = collection.items.map((postEntry: any) => {
    return {
      slugDE: postEntry.slugDE,
      slugEN: postEntry.slugEN,
      publishedAt: new Date(postEntry.date),
    };
  });

  return posts;
}
