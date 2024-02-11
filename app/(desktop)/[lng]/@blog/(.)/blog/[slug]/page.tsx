import { notFound } from "next/navigation";
import { Metadata } from "next";

import {
  GetBlogPosts,
  GetBlogPostBySlug,
} from "@/api/provider/blog-post-provider";

import PageBaseConfiguration from "@/configuration";

import RichTextRenderer from "@/components/contentful/rich-text-renderer";
import BlogHeader from "@/components/blog/blog-header";
import Link from "next/link";

import { getImageSource } from "@/components/contentful/image-asset";

interface BlogPostPageParams {
  slug: string;
  lng: string;
}

interface BlogPostPageProps {
  params: BlogPostPageParams;
}

export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
  const config = PageBaseConfiguration();
  const entries: BlogPostPageParams[] = [];

  config.supportedLocales.forEach(async (locale) => {
    const blogPosts = await GetBlogPosts(locale);

    blogPosts.forEach((post) => {
      entries.push({ slug: post.slug, lng: locale });
    });
  });

  return entries;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const config = PageBaseConfiguration();

  const blogPost = await GetBlogPostBySlug(params.slug, params.lng);

  if (!blogPost) {
    return notFound();
  }

  return {
    metadataBase: config.baseUrl,
    title: blogPost.title,
    description: blogPost.excerpt,
    openGraph: {
      type: "article",
      publishedTime: blogPost.publishedAt.toISOString(),
      url: `${config.baseUrl}/${params.lng}/blog/${params.slug}`,
      locale: params.lng,
      images: [
        { url: getImageSource(blogPost.image, 800), width: 800 },
        { url: getImageSource(blogPost.image, 1800), width: 1800 },
      ],
    },
  };
}

export default async function BlogOverlay({
  params,
}: {
  params: { slug: string; lng: string };
}) {
  const post = await GetBlogPostBySlug(params.slug, params.lng);

  console.log("PARAMS", params);

  if (!post) {
    return notFound();
  }

  return (
    <div className="mx-auto">
      <div className="container flex flex-col p-2 w-ful">
        <BlogHeader
          title={post.title}
          subTitle={post.subTitle}
          backgroundImage={post.image}
        />
        <div className="mt-4 p-4 rounded-md bg-white">
          <h3 className="text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl mb-1 dark:text-white">
            {post.title}
          </h3>
          <h4 className="text-xl font-semibold leading-tight text-gray-900 lg:text-2xl mb-4 dark:text-white">
            {post.subTitle}
          </h4>
          <article>
            <RichTextRenderer document={post.body} />
          </article>
        </div>
        <div>
          <div className="mr-1 mt-2 flex flex-nowrap text-neutral-800">
            <Link
              href="/blog"
              className="rounded bg-sky-500 px-4 py-2 mb-2 font-semibold text-white transition hover:bg-sky-700"
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
                <div>Back to Blog overview</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
