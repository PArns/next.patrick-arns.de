import ContentfulImageAsset from "@/components/contentful/image-asset";
import DateRenderer from "@/components/date-renderer";
import AppLink from "@/components/os/app-link";
import Translate from "@/components/translate";
import {
  BlogPost,
  GetBlogPosts,
} from "@/contentful/provider/blog-post-provider";

export default async function BlogTeaser({
  locale,
  maxEntries,
}: {
  locale: string;
  maxEntries: number;
}) {
  const posts = await GetBlogPosts(locale, 0, maxEntries);

  if (!posts) return null;

  return (
    <div className="flex flex-col gap-2">
      {posts.posts.map((post) => (
        <BlogTeaserCard post={post} key={post.slug} />
      ))}
    </div>
  );
}

function BlogTeaserCard({ post }: { post: BlogPost }) {
  return (
    <div className="flex rounded-lg drop-shadow-lg">
      <article className="w-full">
        <AppLink href={`/${post.locale}/blog/article/${post.slug}`} id="blog">
          <div className="relative overflow-hidden bg-cover bg-no-repeat p-24">
            <ContentfulImageAsset
              asset={post.image}
              alt={post.title}
              fill={true}
              quality={50}
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-t-lg object-cover"
            />

            <div className="absolute left-2 top-2 overflow-hidden">
              <div className="text-white">
                <h1 className="text-4xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {post.title}
                </h1>
                <h2 className="text-2xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {post.subTitle}
                </h2>
              </div>
            </div>

            <div className="absolute bottom-0 left-2 overflow-hidden">
              <div className="text-lg font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <DateRenderer date={post.publishedAt} />
              </div>
            </div>
          </div>
        </AppLink>

        <div className="rounded-b-lg bg-white p-2 dark:bg-neutral-800">
          {post.excerpt && <div>{post.excerpt}</div>}
          <div className="mr-1 mt-2 flex w-full flex-nowrap place-content-end text-neutral-800">
            <AppLink
              href={`/${post.locale}/blog/article/${post.slug}`}
              id="blog"
              className="rounded bg-sky-400 px-4 py-2 font-semibold text-white transition hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700"
            >
              <Translate id="more" ns="blog" locale={post.locale} />
            </AppLink>
          </div>
        </div>
      </article>
    </div>
  );
}
