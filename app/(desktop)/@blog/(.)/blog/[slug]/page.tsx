import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

import {
  GetBlogPosts,
  GetBlogPostBySlug,
} from "@/api/provider/blog-post-provider";
import RichTextRenderer from "@/components/contentful/rich-text-renderer";
import BlogHeader from "@/components/blog/blog-header";

interface BlogPostPageParams {
  slug: string;
}

interface BlogPostPageProps {
  params: BlogPostPageParams;
}

export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
  const blogPosts = await GetBlogPosts();
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blogPost = await GetBlogPostBySlug(params.slug);

  if (!blogPost) {
    return notFound();
  }

  return {
    title: blogPost.title,
  };
}

export default async function BlogOverlay({
  params,
}: {
  params: { slug: string };
}) {
  const post = await GetBlogPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="flex flex-col p-2 w-full">
      <BlogHeader
        title={post.title}
        subTitle={post.subTitle}
        backgroundImage={post.image}
      />
      <div>
        <RichTextRenderer document={post.body} />
      </div>
      <div>
        <div className="mr-1 mt-6 flex flex-nowrap text-neutral-800">
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
              <div>Back to Index</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
