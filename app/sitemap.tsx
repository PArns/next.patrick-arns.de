import { MetadataRoute } from "next";
import PageBaseConfiguration from "@/configuration";
import { GetAllBlogPostSlugs } from "@/data-provider/contentful/provider/blog-post-provider";
import { GetAllGallerySlugs } from "@/data-provider/contentful/provider/gallery-provider";

const createSitemapEntry = (
  baseUrl: URL,
  path: string,
  lastModified: Date,
  changeFrequency:
    | "monthly"
    | "weekly"
    | "always"
    | "hourly"
    | "daily"
    | "yearly"
    | "never",
  priority: number,
  alternates: { [key: string]: string },
) => ({
  url: `${baseUrl}${path}`,
  lastModified,
  changeFrequency,
  priority,
  alternates: {
    languages: alternates,
  },
});

const createBlogPostEntries = (baseUrl: URL, blogPosts: any[]) =>
  blogPosts.map((blogPost) =>
    createSitemapEntry(
      baseUrl,
      `en/blog/article/${blogPost.slugEN}`,
      blogPost.publishedAt,
      "monthly",
      1,
      {
        de: `${baseUrl}de/blog/article/${blogPost.slugDE}`,
        en: `${baseUrl}en/blog/article/${blogPost.slugEN}`,
      },
    ),
  );

const createGalleryPostEntries = (baseUrl: URL, galleryPosts: any[]) =>
  galleryPosts.map((galleryPost) =>
    createSitemapEntry(
      baseUrl,
      `en/pictures/gallery/${galleryPost.slugEN}`,
      galleryPost.publishedAt,
      "monthly",
      0.8,
      {
        de: `${baseUrl}de/pictures/gallery/${galleryPost.slugDE}`,
        en: `${baseUrl}en/pictures/gallery/${galleryPost.slugEN}`,
      },
    ),
  );

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = PageBaseConfiguration();
  const baseUrl = config.baseUrl;

  const blogPosts = await GetAllBlogPostSlugs();
  const blogPostEntries = createBlogPostEntries(baseUrl, blogPosts);

  const galleryPosts = await GetAllGallerySlugs();
  const galleryPostEntries = createGalleryPostEntries(baseUrl, galleryPosts);

  const pages = [
    createSitemapEntry(baseUrl, "", new Date(), "weekly", 0.5, {}),
    createSitemapEntry(baseUrl, "blog", new Date(), "weekly", 1, {
      de: `${baseUrl}de/blog`,
      en: `${baseUrl}en/blog`,
    }),
    createSitemapEntry(baseUrl, "welcome", new Date(), "weekly", 0.5, {
      de: `${baseUrl}de/welcome`,
      en: `${baseUrl}en/welcome`,
    }),
    createSitemapEntry(baseUrl, "me", new Date(), "weekly", 0.5, {
      de: `${baseUrl}de/me`,
      en: `${baseUrl}en/me`,
    }),
    createSitemapEntry(baseUrl, "pictures", new Date(), "weekly", 0.5, {
      de: `${baseUrl}de/pictures`,
      en: `${baseUrl}en/pictures`,
    }),
    createSitemapEntry(baseUrl, "coaster", new Date(), "weekly", 0.5, {
      de: `${baseUrl}de/coaster`,
      en: `${baseUrl}en/coaster`,
    }),
  ];

  return pages.concat(blogPostEntries, galleryPostEntries);
}
