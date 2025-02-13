import { redirect, notFound } from "next/navigation";
import { Metadata } from "next";

import {
  GetBlogPosts,
  GetBlogPostBySlug,
} from "@/data-provider/contentful/provider/blog-post-provider";

import PageBaseConfiguration from "@/configuration";

import RichTextRenderer from "@/components/contentful/rich-text-renderer";
import BlogHeader from "@/components/blog/blog-header";
import Link from "next/link";

import { getImageSource } from "@/components/contentful/image-asset";

import Translate from "@/components/translate";
import { WindowTitle } from "@/components/os/windowManager";
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";
import { LanguageAlternates } from "@/components/os/language-switcher";
import DateRenderer from "@/components/date-renderer";

import { ClockIcon } from "@heroicons/react/20/solid";
import BlogAlternateLanguageLink from "@/components/blog/blog-alternate-language";

interface BlogPostPageParams {
  slug: string;
  lng: string;
}

export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
  const config = PageBaseConfiguration();
  const entries: BlogPostPageParams[] = [];

  config.supportedLocales.forEach(async (locale) => {
    const blogPosts = await GetBlogPosts(locale);

    if (!blogPosts) notFound();

    blogPosts.posts.forEach((post) => {
      entries.push({ slug: post.slug, lng: locale });
    });
  });

  return entries;
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string; lng: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const config = PageBaseConfiguration();
  const post = await GetBlogPostBySlug(params.slug, params.lng);
  if (!post) return {};

  const alternates: AlternateURLs = {
    languages: {},
    canonical: `/blog/article/${params.slug}`,
  };

  if (post.alternativeSlugs && alternates.languages) {
    for (const slugIndex in post.alternativeSlugs) {
      const slug = post.alternativeSlugs[slugIndex];

      if (slugIndex == "de" || slugIndex == "en")
        alternates.languages[slugIndex] = `/${slugIndex}/blog/article/${slug}`;
      else {
        console.log("WARNING! NON SUPPORTED LANGUAGE FOR ALTERNATIVES!!!");
      }
    }
  }

  return {
    metadataBase: config.baseUrl,
    title: `${post.title} - ${post.subTitle} `,
    description: post.excerpt,
    alternates: alternates,
    openGraph: {
      type: "article",
      description: post.excerpt,
      publishedTime: post.publishedAt.toISOString(),
      url: `${config.baseUrl}${params.lng}/blog/article/${params.slug}`,
      locale: params.lng,
      images: [
        { url: getImageSource(post.image, 800), width: 800 },
        { url: getImageSource(post.image, 1800), width: 1800 },
      ],
    },
  };
}

export default async function BlogOverlay(
  props: {
    params: Promise<{ slug: string; lng: string }>;
  }
) {
  const params = await props.params;
  const post = await GetBlogPostBySlug(params.slug, params.lng);
  if (!post) redirect(`/${params.lng}/blog`);

  const alternates: any = {};

  if (post.alternativeSlugs) {
    for (const slugIndex in post.alternativeSlugs) {
      const slug = post.alternativeSlugs[slugIndex];
      alternates[slugIndex as string] = `/${slugIndex}/blog/article/${slug}`;
    }
  }

  return (
    <div className="flex w-full flex-col p-2 @container">
      <WindowTitle id="blog" title={`${post.title} - ${post.subTitle}`} />
      <LanguageAlternates alternates={alternates} />
      <BlogHeader
        title={post.title}
        subTitle={post.subTitle}
        backgroundImage={post.image}
      />
      <div className="mt-4 rounded-md bg-white p-4 dark:bg-neutral-800">
        <h3 className="mb-1 text-3xl font-extrabold leading-tight text-neutral-900 @lg:text-4xl dark:text-white">
          {post.title}
        </h3>
        <h4 className="mb-2 text-xl font-semibold leading-tight text-neutral-900 @lg:text-2xl dark:text-white">
          {post.subTitle}
        </h4>
        <h5 className="text-regular mb-2 flex flex-row font-semibold leading-tight text-neutral-900 dark:text-white">
          <ClockIcon className="mr-2 h-5 w-5" />
          <DateRenderer
            date={post.publishedAt}
            format="long"
            locale={params.lng}
          />
        </h5>
        <BlogAlternateLanguageLink alternatives={alternates} locale={params.lng} />
        <article>
          <RichTextRenderer document={post.body} />
        </article>
      </div>
      <div>
        <div className="mr-1 mt-2 flex flex-nowrap text-neutral-800">
          <Link
            href={`/${params.lng}/blog`}
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
                <Translate id="back" ns="blog" locale={params.lng} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
