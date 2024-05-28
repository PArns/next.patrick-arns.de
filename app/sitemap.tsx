import { MetadataRoute } from "next";
import PageBaseConfiguration from "@/configuration";
import { GetAllBlogPostSlugs } from "@/data-provider/contentful/provider/blog-post-provider";
import { GetAllGallerySlugs } from "@/data-provider/contentful/provider/gallery-provider";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = PageBaseConfiguration();
  const baseUrl = config.baseUrl;

  const blogPosts = await GetAllBlogPostSlugs();
  const blogPostEntries: any = [];

  blogPosts.map((blogPost) => {
    blogPostEntries.push({
      url: `${baseUrl}en/blog/article/${blogPost.slugEN}`,
      lastModified: blogPost.publishedAt,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          de: `${baseUrl}de/blog/article/${blogPost.slugDE}`,
          en: `${baseUrl}en/blog/article/${blogPost.slugEN}`,
        },
      },
    });
  });

  const galleryPosts = await GetAllGallerySlugs();

  galleryPosts.map((galleryPost) => {
    blogPostEntries.push({
      url: `${baseUrl}en/pictures/gallery/${galleryPost.slugEN}`,
      lastModified: galleryPost.publishedAt,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          de: `${baseUrl}de/pictures/gallery/${galleryPost.slugDE}`,
          en: `${baseUrl}en/pictures/gallery/${galleryPost.slugEN}`,
        },
      },
    });
  });

  let pages: any = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          de: `${baseUrl}de/blog`,
          en: `${baseUrl}en/blog`,
        },
      },
    },
    {
      url: `${baseUrl}welcome`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          de: `${baseUrl}de/welcome`,
          en: `${baseUrl}en/welcome`,
        },
      },
    },
    {
      url: `${baseUrl}me`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          de: `${baseUrl}de/me`,
          en: `${baseUrl}en/me`,
        },
      },
    },
    {
      url: `${baseUrl}pictures`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          de: `${baseUrl}de/pictures`,
          en: `${baseUrl}en/pictures`,
        },
      },
    },
    {
      url: `${baseUrl}coaster`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          de: `${baseUrl}de/coaster`,
          en: `${baseUrl}en/coaster`,
        },
      },
    },
  ];

  var allPages = pages.concat(blogPostEntries);
  return allPages;
}
