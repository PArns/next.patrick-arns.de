import { GetBlogPosts } from "@/data-provider/contentful/provider/blog-post-provider";
import BlogCard from "@/components/blog/blog-card";
import PageBaseConfiguration from "@/configuration";
import Pagination from "@/components/blog/pagination";
import { WindowTitle } from "@/components/os/windowManager";
import Image from "next/image";
import initTranslations from "@/components/translate/i18n";
import Translate from "@/components/translate";
import Tag from "@/components/blog/tag";
import { notFound } from "next/navigation";
import Link from "next/link";

import BlogJumbotron from "@/public/jumbotron/blog.jpg";
import AboutAuthor from "@/parts/about-author";

import { getPageAlternates } from "@/helper/localization";
import CoasterStats from "@/components/coaster/coaster-stats";

export async function generateMetadata(
  props: {
    params: Promise<{ lng: string; pageNumber: number; tag: string | undefined }>;
  }
) {
  const params = await props.params;
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["blog"],
  });

  var baseRoute = "blog";

  if (params.pageNumber > 1) {
    baseRoute = `blog/page/${params.pageNumber}`;
  } else if (params.tag) {
    baseRoute = `blog/tag/${params.tag}`;
  }

  return {
    title: "Blog",
    description: t("subTitle"),
    alternates: getPageAlternates(baseRoute),
    openGraph: {
      type: "website",
      description: t("subTitle"),
      locale: params.lng,
      images: "/jumbotron/blog.jpg",
    },
  };
}

export default async function BlogIndex(
  props: {
    params: Promise<{ lng: string; pageNumber: number; tag: string | undefined }>;
  }
) {
  const params = await props.params;
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
    params.tag,
  );

  if (!posts) return null;

  if (posts.posts.length === 0) {
    notFound();
  }

  const pageCount = Math.ceil(posts.total / postsPerPage);

  return (
    <div className="flex flex-col p-2 @container">
      <WindowTitle id="blog" title={"Blog"} />

      <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat text-center">
        <Image
          className="absolute bottom-0 left-0 right-0 top-0 h-max w-max object-cover"
          src={BlogJumbotron}
          fill={true}
          alt="Blog Header"
        />

        <div className="py-8 @md:py-14 @lg:py-20">
          <div className="flex h-full items-center justify-center">
            <div className="rounded-xl border-neutral-500 bg-white/30 p-5 text-white backdrop-blur-md dark:border-neutral-600 dark:bg-neutral-800/50">
              <h1 className="mb-4 text-5xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @lg:text-7xl">
                Blog
              </h1>
              <h2 className="text-lg font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @md:text-xl @lg:text-2xl">
                <Translate id="subTitle" locale={params.lng} ns="blog" />
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex w-full flex-col gap-3 @3xl:w-3/4">
          {posts.posts.map((post) => (
            <BlogCard post={post} key={post.slug} />
          ))}

          {pageCount > 1 && !params.tag && (
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

        <div className="hidden w-1/4 flex-col gap-2 pl-2 @3xl:flex">
          <AboutAuthor lng={params.lng} />

          <div className="flex flex-col rounded-lg bg-white p-4 drop-shadow-lg dark:bg-neutral-800">
            <div className="pb-2">Tag Cloud</div>
            <div className="flex flex-wrap gap-2">
              {posts.tags.map((tag) => (
                <Tag
                  tag={tag}
                  key={tag}
                  locale={params.lng}
                  href={`/${params.lng}/blog/tag/${tag}`}
                />
              ))}
            </div>
          </div>

          {params.tag && (
            <div className="flex-col rounded-lg bg-white p-4 text-center drop-shadow-lg dark:bg-neutral-800">
              <div className="pb-2 font-bold">
                <Translate id="titleShowingTag" ns="blog" locale={params.lng} />
              </div>
              <div className="flex flex-col gap-3">
                <Tag
                  tag={params.tag}
                  key={params.tag}
                  locale={params.lng}
                  href={`/${params.lng}/blog/tag/${params.tag}`}
                />

                <Link
                  href={`/${params.lng}/blog`}
                  className="rounded-sm bg-sky-500 px-2 py-2 font-semibold text-white transition hover:bg-sky-700 @lg:px-4"
                >
                  <Translate id="showAll" ns="blog" locale={params.lng} />
                </Link>
              </div>
            </div>
          )}

          <CoasterStats lng={params.lng} />
        </div>
      </div>
    </div>
  );
}
