import { fetchGraphQL } from "@/contentful/client";
import { LocaleCode } from "contentful";
import { isValidLocale } from "@/helper/localization";

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
  alternativeSlugs?: any;
  body?: any;
  excerpt: string;
  image: any;
  locale: string;
  publishedAt: Date;
}

export async function GetBlogPosts(
  locale: LocaleCode,
  skip: number = 0,
  limit: number = 10,
  tag: string | undefined = undefined,
): Promise<BlogPosts | null> {
  if (!isValidLocale(locale)) return null;

  const query = `query($limit: Int!, $skip: Int!, $locale: String!) {
    blogPostCollection(
        order: publishedAt_DESC, 
        where: { listEntry: true }, 
        limit: $limit, 
        skip: $skip, 
        locale: $locale) {
          total
          skip
          limit
          items {
            title
            subTitle
            slug
            publishedAt
            excerpt
            image {
              url
            }
            contentfulMetadata {
              tags {
                  id
                  name
              }
            }
          }
        }
    }`;

  const variables = { locale: locale, limit: tag ? 999 : limit, skip: skip };
  const data = await fetchGraphQL(query, variables);
  const collection = data.data.blogPostCollection;

  const regex = /Blog: (.*)/gm;

  const availableTags: string[] = [];

  const posts: BlogPost[] = collection.items.map((postEntry: any) => {
    const tags = postEntry.contentfulMetadata.tags;

    if (tags) {
      tags.map((tagEntry: any) => {
        const match = regex.exec(tagEntry.name);
        if (match) {
          availableTags.push(match[1]);
        }
      });

      return {
        title: postEntry.title,
        subTitle: postEntry.subTitle,
        slug: postEntry.slug,
        excerpt: postEntry.excerpt,
        image: postEntry.image,
        locale: locale,
        publishedAt: new Date(postEntry.publishedAt),
      };
    }
  });

  return {
    posts: posts,
    tags: Array.from(new Set(availableTags)),
    total: collection.total,
    skip: collection.skip,
    limit: collection.limit,
  };
}

const BLOG_POST_DATA = `title
subTitle
slug
slugDE: slug(locale: "de")
slugEN: slug(locale: "en")
publishedAt
excerpt
body { 
  json
  links {
    entries {
      inline {
        sys {
          id
        }
        __typename
        ... on BlogPostImage {
          useDefaultStyle
          floatingDirection
          maxWidth
          classes
          imageClasses
          styles
          showSubtitle
          useLightBox
          image {
            url
          }
          name
        }
        ... on ImageGallery {
          imagesCollection {
            items {
              url
              width
              height
              description
              title
            }
          }
        }
        ... on BlogPostVideo {
          title
          videoUrl
        }
      }
      block {
        sys {
          id
        }
        __typename
      }
    }
    assets {
      block {
        sys {
          id
        }
        url
        title
        width
        height
        description
      }
    }
  }
}
image {
  url
}
contentfulMetadata {
  tags {
      id
      name
  }
}`;

export async function GetBlogPostBySlug(
  slug: string,
  locale: string,
): Promise<BlogPost | null> {
  if (!isValidLocale(locale)) return null;

  const query = `query($slug: String!, $locale: String!) {
    blogPostCollection(where: {slug: $slug}, locale: $locale, limit: 1) {
        items {
          ${BLOG_POST_DATA}
        } 
      }
    }`;

  const variables = { slug: slug, locale: locale };
  const data = await fetchGraphQL(query, variables);

  const postEntry = data?.data?.blogPostCollection?.items[0];

  if (!postEntry) return null;

  const post: BlogPost = {
    title: postEntry.title,
    subTitle: postEntry.subTitle,
    slug: postEntry.slug,
    excerpt: postEntry.excerpt,
    image: postEntry.image,
    locale: locale,
    body: postEntry.body,
    publishedAt: new Date(postEntry.publishedAt),
    alternativeSlugs: {
      de: postEntry.slugDE,
      en: postEntry.slugEN,
    },
  };

  return post;
}

export async function GetBlogPostById(
  postId: string,
  locale: string,
): Promise<BlogPost | null> {
  if (!isValidLocale(locale)) return null;

  if (!isValidLocale(locale)) return null;

  const query = `query($id: String!, $locale: String!) {
    blogPost(id: $id , locale: $locale) {
        ${BLOG_POST_DATA}
      }
    }`;

  const variables = { id: postId, locale: locale };
  const data = await fetchGraphQL(query, variables);
  const postEntry = data?.data?.blogPost;

  if (!postEntry) return null;

  const post: BlogPost = {
    title: postEntry.title,
    subTitle: postEntry.subTitle,
    slug: postEntry.slug,
    excerpt: postEntry.excerpt,
    image: postEntry.image,
    locale: locale,
    body: postEntry.body,
    publishedAt: new Date(postEntry.publishedAt),
    alternativeSlugs: {
      de: postEntry.slugDE,
      en: postEntry.slugEN,
    },
  };

  return post;
}
