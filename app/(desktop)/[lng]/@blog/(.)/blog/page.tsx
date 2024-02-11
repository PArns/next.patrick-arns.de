import { GetBlogPosts } from "@/api/provider/blog-post-provider";
import BlogCard from "@/components/blog/blog-card";

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
  const posts = await GetBlogPosts(params.lng);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col p-2 gap-2">
        {posts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
}
