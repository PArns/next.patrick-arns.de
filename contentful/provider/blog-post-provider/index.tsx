import client from "@/contentful/client";

import { TypeBlogPostSkeleton } from "@/contentful/types";

import { Entry, LocaleCode } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

import { cache } from "react";

type BlogPostEntry = Entry<TypeBlogPostSkeleton, undefined, string>;

export interface BlogPosts {
  posts: BlogPost[];
  tags: string[];
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

export const GetBlogPosts = cache(
  async (
    locale: LocaleCode,
    skip: number = 0,
    limit: number = 10,
    tag: string | undefined = undefined,
  ): Promise<BlogPosts> => {
    let query: Record<string, any> = {
      content_type: "blogPost",
      order: "-fields.publishedAt",
      locale: locale,
      limit: tag ? 999 : limit,
      skip: skip,
      include: 1,
      "fields.listEntry": true,
      "fields.translations": locale.toUpperCase() === "DE" ? "DE" : "EN",
    };

    if (tag) {
      query["query"] = `"${tag}"`;
    }

    const res = await client.getEntries<TypeBlogPostSkeleton>(query);
    const posts = res.items.map(
      (blogPostEntry) => parseContentfulBlogPost(blogPostEntry, locale) as BlogPost);
    // Return all tags, starting with the "Blog: " category
    const tagsRes = await client.getTags();
    const tags: string[] = tagsRes.items
      .map((tagEntry) => {
        const regex = /Blog: (.*)/gm;

        const match = regex.exec(tagEntry.name);
        if (match) {
          return match[1];
        } else {
          return "";
        }
      })
      .filter((tag_1) => tag_1 !== "");
      
    return {
      posts: posts,
      tags: tags || [],
      total: res.total,
      skip: res.skip,
      limit: res.limit,
    };
  },
);

export const GetBlogPostBySlug = cache(
  async (slug: string, locale: string): Promise<BlogPost> => {
    const res = await client
      .getEntries<TypeBlogPostSkeleton>({
        content_type: "blogPost",
        limit: 1,
        include: 10,
        locale: locale,
        "fields.slug": slug,
      });
    const post = res.items[0];

    return parseContentfulBlogPost(post);
  },
);
