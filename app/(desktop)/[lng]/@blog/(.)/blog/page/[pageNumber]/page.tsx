import { GetBlogPosts } from "@/contentful/provider/blog-post-provider";
import BlogCard from "@/components/blog/blog-card";
import PageBaseConfiguration from "@/configuration";
import Pagination from "@/components/blog/pagination";
import { WindowTitle } from "@/components/os/windowManager";
import Image from "next/image";
import initTranslations from "@/components/translate/i18n";
import Translate from "@/components/translate";

export async function generateMetadata({
  params,
}: {
  params: { lng: string; pageNumber: number };
}) {
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["blog"],
  });

  return {
    title: "Blog",
    description: t("subTitle"),
    openGraph: {
      type: "website",
      locale: params.lng,
      images: "/images/jumbotron/blog.jpg",
    },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: { lng: string; pageNumber: number };
}) {
  const config = PageBaseConfiguration();

  if (!config.supportedLocales.includes(params.lng)) return <></>;

  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["blog"],
  });

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
      <WindowTitle id="blog" title={"Blog"} />

      <div className="relative mb-2 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat text-center">
        <Image
          className="absolute bottom-0 left-0 right-0 top-0 h-max w-max object-cover"
          src={"/images/jumbotron/blog.jpg"}
          fill={true}
          quality={80}
          alt="Blog Header"
        />

        <div className="py-8 md:py-14 lg:py-20">
          <div className="flex h-full items-center justify-center">
            <div className="text-white">
              <h1 className="mb-4 text-5xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] lg:text-7xl">
                Blog
              </h1>
              <h2 className="text-lg font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-xl lg:text-2xl">
                <Translate id="subTitle" locale={params.lng} ns="blog" />
              </h2>
            </div>
          </div>
        </div>
      </div>

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
