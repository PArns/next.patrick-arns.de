import client from "@/api/client";

import { TypeBlogPostSkeleton } from "@/api/types";

import { Entry, EntryFieldTypes } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

type BlogPostEntry = Entry<TypeBlogPostSkeleton, undefined, string>;

export interface BlogPost {
  title: string;
  subTitle: string;
  slug: string;
  body: RichTextDocument | null;
  excerpt: string;
  image: any;
  publishedAt: Date;
}

// A function to transform a Contentful blog post
// into our own BlogPost object.
export function parseContentfulBlogPost(
  blogPostEntry?: BlogPostEntry
): BlogPost | null {
  if (!blogPostEntry) {
    return null;
  }

  return {
    title: blogPostEntry.fields.title || "",
    subTitle: blogPostEntry.fields.subTitle || "",
    slug: blogPostEntry.fields.slug,
    body: blogPostEntry.fields.body || null,
    excerpt: blogPostEntry.fields.excerpt || "",
    image: blogPostEntry.fields.image || null,
    publishedAt: new Date(blogPostEntry.fields.publishedAt),
  };
}

export async function GetBlogPostsMeta() {}

export async function GetBlogPosts() {
  const res = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: "blogPost",
    order: ["-fields.publishedAt"],
    "fields.listEntry": true,
  });

  return res.items.map(
    (blogPostEntry) => parseContentfulBlogPost(blogPostEntry) as BlogPost
  );
}

export async function GetBlogPostBySlug(slug: string) {
  const res = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: "blogPost",
    limit: 1,
    include: 10,
    "fields.slug": slug,
  });

  const post = res.items[0];
  return parseContentfulBlogPost(post);
}
