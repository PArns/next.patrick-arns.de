import client from "@/contentful/client";

import { TypeBlogPostSkeleton } from "@/contentful/types";

import { Entry, LocaleCode } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

type BlogPostEntry = Entry<TypeBlogPostSkeleton, undefined, string>;

export interface BlogPosts {
  posts: BlogPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface BlogPost {
  title: string;
  subTitle: string;
  slug: string;
  body: RichTextDocument | null;
  excerpt: string;
  image: any;
  locale: string;
  publishedAt: Date;
}

// A function to transform a Contentful blog post
// into our own BlogPost object.
export function parseContentfulBlogPost(
  blogPostEntry?: BlogPostEntry,
  locale?: string,
): BlogPost {
  if (!blogPostEntry) {
    return {
      title: "PARSING ERROR",
      subTitle: "",
      slug: "",
      body: null,
      excerpt: "",
      image: null,
      locale: locale || "en",
      publishedAt: new Date(),
    };
  }

  return {
    title: blogPostEntry.fields.title || "",
    subTitle: blogPostEntry.fields.subTitle || "",
    slug: blogPostEntry.fields.slug,
    body: blogPostEntry.fields.body || null,
    excerpt: blogPostEntry.fields.excerpt || "",
    image: blogPostEntry.fields.image || null,
    locale: locale || "en",
    publishedAt: new Date(blogPostEntry.fields.publishedAt),
  };
}

export async function GetBlogPosts(
  locale: LocaleCode,
  skip: number = 0,
  limit: number = 10,
): Promise<BlogPosts> {
  const res = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: "blogPost",
    order: ["-fields.publishedAt"],
    locale: locale,
    limit: limit,
    skip: skip,
    include: 1,
    "fields.listEntry": true,
    "fields.translations": locale.toUpperCase() == "DE" ? "DE" : "EN",
  });

  const posts = res.items.map(
    (blogPostEntry) =>
      parseContentfulBlogPost(blogPostEntry, locale) as BlogPost,
  );

  return {
    posts: posts,
    total: res.total,
    skip: res.skip,
    limit: res.limit,
  };
}

export async function GetBlogPostBySlug(
  slug: string,
  locale: string,
): Promise<BlogPost> {
  const res = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: "blogPost",
    limit: 1,
    include: 10,
    locale: locale,
    "fields.slug": slug,
  });

  const post = res.items[0];
  return parseContentfulBlogPost(post);
}
