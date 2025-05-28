import ContentfulImageAsset from "@/components/contentful/image-asset";
import DateRenderer from "@/components/date-renderer";
import AppLink from "@/components/os/app-link";
import Translate from "@/components/translate";
import {
  BlogPost,
  GetBlogPostById,
  GetBlogPosts,
} from "@/data-provider/contentful/provider/blog-post-provider";
import clsx from "clsx";

export async function BlogTeaserSpecific({
  locale,
  postId,
  className,
}: {
  locale: string;
  postId: string;
  className?: string;
}) {
  const post = await GetBlogPostById(postId, locale);

  if (!post) return null;

  return (
    <section className={clsx("flex flex-col gap-2", className)}>
      <BlogTeaserCard post={post} key={post.slug} />
    </section>
  );
}

export default async function BlogTeaser({
  locale,
  maxEntries,
  className,
}: {
  locale: string;
  maxEntries: number;
  className?: string;
}) {
  const posts = await GetBlogPosts(locale, 0, maxEntries);

  if (!posts) return null;

  return (
    <section className={clsx(className)}>
      <div className="@container flex flex-col gap-2">
        {posts.posts.map((post) => (
          <BlogTeaserCard post={post} key={post.slug} />
        ))}
      </div>
    </section>
  );
}

function BlogTeaserCard({ post }: { post: BlogPost }) {
  return (
    <div className="flex rounded-lg drop-shadow-lg">
      <article className="w-full">
        <AppLink href={`/${post.locale}/blog/article/${post.slug}`} id="blog">
          <div className="relative overflow-hidden bg-cover bg-no-repeat p-16 @lg:p-24">
            <ContentfulImageAsset
              asset={post.image}
              alt={post.title}
              priority={true}
              quality={80}
              height={200}
              width={1200}
              className="absolute top-0 right-0 bottom-0 left-0 h-full w-full rounded-t-lg object-cover"
            />

            <div className="absolute top-2 left-2 overflow-hidden @lg:top-4 @lg:left-4">
              <div className="text-white">
                <h1 className="text-2xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @lg:text-4xl">
                  {post.title}
                </h1>
                <h2 className="text-xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @lg:text-2xl">
                  {post.subTitle}
                </h2>
              </div>
            </div>

            <div className="absolute bottom-0 left-4 overflow-hidden">
              <div className="text-lg font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <DateRenderer date={post.publishedAt} />
              </div>
            </div>
          </div>
        </AppLink>

        <div className="rounded-b-lg bg-white p-2 @lg:p-4 dark:bg-neutral-800">
          {post.excerpt && <div>{post.excerpt}</div>}
          <div className="mt-2 mr-1 flex w-full flex-nowrap place-content-end text-neutral-800">
            <AppLink
              href={`/${post.locale}/blog/article/${post.slug}`}
              id="blog"
              className="rounded-sm bg-sky-400 px-2 py-2 font-semibold text-white transition hover:bg-sky-700 @lg:px-4 dark:bg-sky-600 dark:hover:bg-sky-700"
            >
              <Translate id="more" ns="blog" locale={post.locale} />
            </AppLink>
          </div>
        </div>
      </article>
    </div>
  );
}
