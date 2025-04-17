import BlogIndex, {
  generateMetadata as blogMetaData,
} from "@/app/(desktop)/[lng]/@blog/(.)/blog/page/[pageNumber]/page";
import PageBaseConfiguration from "@/configuration";
import { GetBlogPosts } from "@/data-provider/contentful/provider/blog-post-provider";

export async function generateStaticParams() {
  const config = PageBaseConfiguration();
  const params: { lng: string; tag: string }[] = [];

  for (const lng of config.supportedLocales) {
    const posts = await GetBlogPosts(lng);
    if (!posts) continue;
    for (const tag of posts.tags) {
      params.push({ lng, tag });
    }
  }

  return params;
}

export async function generateMetadata(
  props: {
    params: Promise<{ lng: string; tag: string | undefined }>;
  }
) {
  const params = await props.params;
  return await blogMetaData({
    params: Promise.resolve({ lng: params.lng, pageNumber: 1, tag: params.tag, fromProxy: true }),
  });
}

export default async function BlogProxy(
  props: {
    params: Promise<{ lng: string; tag: string | undefined }>;
  }
) {
  const params = await props.params;
  return await BlogIndex({
    params: Promise.resolve({ lng: params.lng, pageNumber: 1, tag: params.tag, fromProxy: true }),
  });
}
