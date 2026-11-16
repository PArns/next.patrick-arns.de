import { MetadataRoute } from "next";
import PageBaseConfiguration from "@/configuration";
import { GetAllBlogPostSlugs } from "@/data-provider/contentful/provider/blog-post-provider";
import { GetAllGallerySlugs } from "@/data-provider/contentful/provider/gallery-provider";

const createSitemapEntry = (
  baseUrl: URL,
  path: string,
  lastModified: Date,
  changeFrequency:
    "monthly" | "weekly" | "always" | "hourly" | "daily" | "yearly" | "never",
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

  // Unprefixed routes only redirect, so the sitemap lists the localized URLs.
  const pages = ["blog", "welcome", "me", "pictures", "coaster"].map((route) =>
    createSitemapEntry(
      baseUrl,
      `en/${route}`,
      new Date(),
      "weekly",
      route === "blog" ? 1 : 0.5,
      {
        de: `${baseUrl}de/${route}`,
        en: `${baseUrl}en/${route}`,
      },
    ),
  );

  return pages.concat(blogPostEntries, galleryPostEntries);
}
