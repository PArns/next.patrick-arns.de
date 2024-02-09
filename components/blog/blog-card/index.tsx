import { BlogPost } from "@/api/provider/blog-post-provider";
import ContentfulImageAsset from "@/components/contentful/image-asset";
import Link from "next/link";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="w-full flex-flex-col rounded-lg drop-shadow-lg"
    >
      <article>
        <div className="relative overflow-hidden bg-cover bg-no-repeat p-16 w-full">
          <ContentfulImageAsset
            asset={post.image}
            alt={post.title}
            width={600}
            height={300}
            className="absolute top-0 left-0 right-0 bottom-0 h-full w-full object-cover rounded-t-lg"
          />

          <div className="absolute top-2 left-2 overflow-hidden">
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
            <div className="text-white text-md font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {post.publishedAt.toLocaleDateString()}
            </div>
          </div>
        </div>
        {post.excerpt && (
          <div className="bg-white/50 rounded-b-lg p-2">{post.excerpt}</div>
        )}
      </article>
    </Link>
  );
}
