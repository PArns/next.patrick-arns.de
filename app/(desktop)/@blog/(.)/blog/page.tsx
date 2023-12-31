import Link from "next/link";

import { GetBlogPosts } from "@/api/provider/blog-post-provider";

export default async function BlogIndex() {
  const posts = await GetBlogPosts();

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <div key={post.slug.toString()}>
          <Link href={`/blog/${post.slug}`}>{post.title?.toString()}</Link>
        </div>
      ))}
    </div>
  );
}
