import { GetBlogPostBySlug } from "@/data-provider/contentful/provider/blog-post-provider";
import { permanentRedirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isValidLocale } from "@/helper/localization";

export default async function DefaultRedirect(
  props: {
    params: Promise<{ catchAll: string; lng: string }>;
  }
) {
  const params = await props.params;
  const slug = Array.isArray(params.catchAll)
    ? params.catchAll[0]
    : params.catchAll;

  if (slug === null || !isValidLocale(params.lng)) notFound();

  const post = await GetBlogPostBySlug(slug, params.lng);
  if (post === null) notFound();

  revalidatePath(`/${params.lng}/blog/${params.catchAll}`);
  permanentRedirect(`/${params.lng}/blog/article/${params.catchAll}`);
}
