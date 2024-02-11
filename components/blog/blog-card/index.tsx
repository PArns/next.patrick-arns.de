import { BlogPost } from "@/contentful/provider/blog-post-provider";
import ContentfulImageAsset from "@/components/contentful/image-asset";
import Link from "next/link";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/${post.locale}/blog/${post.slug}`}
      className="flex rounded-lg drop-shadow-lg"
    >
      <article className="w-full">
        <div className="relative overflow-hidden bg-cover bg-no-repeat p-16">
          <ContentfulImageAsset
            asset={post.image}
            alt={post.title}
            width={600}
            height={300}
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-t-lg object-cover"
          />

          <div className="absolute left-2 top-2 overflow-hidden">
            <div className="text-white">
              <h1 className="text-3xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {post.title}
              </h1>
              <h2 className="text-xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {post.subTitle}
              </h2>
            </div>
          </div>

          <div className="absolute bottom-0 left-2 overflow-hidden">
            <div className="text-md font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {post.publishedAt.toLocaleDateString()}
            </div>
          </div>
        </div>
        {post.excerpt && (
          <div className="rounded-b-lg bg-white/50 p-2">{post.excerpt}</div>
        )}
      </article>
    </Link>
  );
}
