import { GetBlogPosts } from "@/contentful/provider/blog-post-provider";
import BlogCard from "@/components/blog/blog-card";
import PageBaseConfiguration from "@/configuration";
import Pagination from "@/components/blog/pagination";

export async function generateMetadata({
  params,
}: {
  params: { lng: string; pageNumber: number };
}) {
  return {
    title: "Blog",
  };
}

export default async function BlogIndex({
  params,
}: {
  params: { lng: string; pageNumber: number };
}) {
  const config = PageBaseConfiguration();

  if (!config.supportedLocales.includes(params.lng)) return <></>;

  const activePage = +params.pageNumber - 1;
  const postsPerPage = config.blogPostsPerPage;

  const posts = await GetBlogPosts(
    params.lng,
    postsPerPage * (activePage * postsPerPage),
    postsPerPage,
  );

  const pageCount = Math.ceil(posts.total / postsPerPage);

  return (
    <div className="flex flex-col gap-2 p-2">
      {posts.posts.map((post) => (
        <BlogCard post={post} key={post.slug} />
      ))}

      {pageCount > 1 && (
        <div className="flex w-full place-content-end">
          <Pagination
            baseUrl={`/${params.lng}/blog`}
            paginationSlug="page"
            currentPage={+params.pageNumber}
            pageCount={pageCount}
          />
        </div>
      )}
    </div>
  );
}
