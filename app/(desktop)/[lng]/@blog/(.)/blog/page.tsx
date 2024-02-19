import {
  BlogPosts,
  GetBlogPosts,
} from "@/contentful/provider/blog-post-provider";
import BlogCard from "@/components/blog/blog-card";

import PageBaseConfiguration from "@/configuration";

export async function generateMetadata() {
  return {
    title: "Blog",
  };
}

export default async function BlogIndex({
  params,
}: {
  params: { lng: string };
}) {
  const config = PageBaseConfiguration();

  if (!config.supportedLocales.includes(params.lng)) return <></>;

  const posts = await GetBlogPosts(params.lng);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-2 p-2">
        {posts.posts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
}
