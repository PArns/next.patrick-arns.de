import { GetBlogPosts } from "@/api/provider/blog-post-provider";
import BlogCard from "@/components/blog/blog-card";

export async function generateMetadata() {
  return {
    title: "Blog",
  };
}

export default async function BlogIndex() {
  const posts = await GetBlogPosts();

  return (
    <div className="mx-auto">
      <div className="container flex flex-col w-full p-2 gap-2">
        {posts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
}
