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
        <Link href="/blog">Back to index</Link>
      </div>
    </div>
  );
}
