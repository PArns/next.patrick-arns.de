import { BlogPost } from "@/data-provider/contentful/provider/blog-post-provider";
import ContentfulImageAsset from "@/components/contentful/image-asset";
import Link from "next/link";
import DateRenderer from "@/components/date-renderer";
import Translate from "@/components/translate";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="@container/card flex w-full rounded-lg drop-shadow-lg">
      <article className="w-full">
        <Link href={`/${post.locale}/blog/article/${post.slug}`}>
          <div className="relative overflow-hidden bg-cover bg-no-repeat p-20 @lg/card:p-24">
            <ContentfulImageAsset
              asset={post.image}
              alt={post.title}
              fill={true}
              quality={50}
              className="absolute top-0 right-0 bottom-0 left-0 h-full w-full rounded-t-lg object-cover"
            />

            <div className="absolute top-2 left-2 overflow-hidden @lg:top-4 @lg:left-4">
              <div className="text-white">
                <h1 className="text-2xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @lg/card:text-4xl">
                  {post.title}
                </h1>
                <h2 className="text-xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @lg/card:text-2xl">
                  {post.subTitle}
                </h2>
              </div>
            </div>

            <div className="absolute bottom-0 left-2 overflow-hidden @lg:left-4">
              <div className="text-lg font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <DateRenderer date={post.publishedAt} />
              </div>
            </div>
          </div>
        </Link>

        <div className="rounded-b-lg bg-white p-2 @lg:p-4 dark:bg-neutral-800">
          {post.excerpt && <div>{post.excerpt}</div>}
          <div className="mt-2 mr-1 flex w-full flex-nowrap place-content-end text-neutral-800">
            <Link
              href={`/${post.locale}/blog/article/${post.slug}`}
              className="rounded-sm bg-sky-400 px-2 py-2 font-semibold text-white transition hover:bg-sky-700 @lg/card:px-4 dark:bg-sky-600 dark:hover:bg-sky-700"
            >
              <Translate id="more" ns="blog" locale={post.locale} />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
