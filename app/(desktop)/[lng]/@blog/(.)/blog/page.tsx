import { GetBlogPosts } from "@/api/provider/blog-post-provider";
import BlogCard from "@/components/blog/blog-card";

import { headers} from "next/headers";
import PageBaseConfiguration from "@/configuration";

export async function generateMetadata() {
  return {
    title: "Blog",
  };
}

export default async function BlogIndex() {
  const config = PageBaseConfiguration();

  const headersList = headers();
  const currentLocale = headersList.get("x-locale") ?? config.defaultLocale;

  const posts = await GetBlogPosts();

  return (
    <div className="mx-auto">
      <div className="container flex flex-col w-full p-2 gap-2">
        {posts.map((post) => (
          <BlogCard locale={currentLocale} post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
}
