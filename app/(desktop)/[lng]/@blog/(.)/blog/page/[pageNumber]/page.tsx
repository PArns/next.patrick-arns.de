import { GetBlogPosts } from "@/contentful/provider/blog-post-provider";
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
import ProfilePic from "@/public/images/profilePic.jpg";
import TranslateSwitch, {
  Translation,
} from "@/components/translate/translate-switch";

export async function generateMetadata({
  params,
}: {
  params: { lng: string; pageNumber: number; tag: string | undefined };
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
      images: "/jumbotron/blog.jpg",
    },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: { lng: string; pageNumber: number; tag: string | undefined };
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
    params.tag,
  );

  if (!posts) return null;

  if (posts.posts.length === 0) {
    notFound();
  }

  const pageCount = Math.ceil(posts.total / postsPerPage);

  return (
    <div className="flex flex-col p-2">
      <WindowTitle id="blog" title={"Blog"} />

      <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat text-center">
        <Image
          className="absolute bottom-0 left-0 right-0 top-0 h-max w-max object-cover"
          src={BlogJumbotron}
          placeholder="blur"
          fill={true}
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

      <div className="flex">
        <div className="flex flex-col gap-3 lg:w-3/4">
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
        <div className="hidden w-1/4 flex-col gap-2 pl-2 lg:flex">
          <div className="flex flex-col rounded-lg bg-white p-2 drop-shadow-lg dark:bg-neutral-800">
            <div className="pb-2 text-xl font-bold">
              <Translate id="aboutAuthor" locale={params.lng} ns="blog" />
            </div>
            <Image
              className="mx-auto h-32 w-32 rounded-full"
              width={128}
              height={128}
              src={ProfilePic}
              alt="Profile picture"
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Patrick Arns
            </h2>
            <p className="text-center">Software Engineer</p>

            <div className="mt-2">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  Patrick schrieb die ersten Zeilen Code für{" "}
                  <a
                    href="https://cyberghostvpn.com"
                    className="external"
                    target="_blank"
                  >
                    CyberGhost
                  </a>{" "}
                  im Jahr 2003 und arbeitet für die{" "}
                  <a
                    href="https://kape.com"
                    className="external"
                    target="_blank"
                  >
                    Kape PLC
                  </a>
                  , zu der{" "}
                  <a
                    href="https://cyberghostvpn.com"
                    className="external"
                    target="_blank"
                  >
                    CyberGhost
                  </a>{" "}
                  mittlerweile gehört.
                </Translation>
                <Translation lang="en">
                  Patrick wrote the first lines of code for{" "}
                  <a
                    href="https://cyberghostvpn.com"
                    className="external"
                    target="_blank"
                  >
                    CyberGhost
                  </a>{" "}
                  in 2003 and works for{" "}
                  <a
                    href="https://kape.com"
                    className="external"
                    target="_blank"
                  >
                    Kape PLC
                  </a>
                  , which{" "}
                  <a
                    href="https://cyberghostvpn.com"
                    className="external"
                    target="_blank"
                  >
                    CyberGhost
                  </a>{" "}
                  is now part of.
                </Translation>
              </TranslateSwitch>
            </div>

            <div className="mt-1 w-full pr-2 text-right">
              <Link href={`/${params.lng}/about-me`}>
                <Translate id="profileMore" locale={params.lng} ns="blog" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col rounded-lg bg-white p-2 drop-shadow-lg dark:bg-neutral-800">
            <div className="pb-2 font-bold">Tag Cloud</div>
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
            <div className="flex-col rounded-lg bg-white p-2 text-center drop-shadow-lg dark:bg-neutral-800">
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
                  className="rounded bg-sky-500 px-4 py-2 font-semibold text-white transition hover:bg-sky-700"
                >
                  <Translate id="showAll" ns="blog" locale={params.lng} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
