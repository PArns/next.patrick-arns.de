import { GetBlogPostBySlug } from "@/data-provider/contentful/provider/blog-post-provider";
import { permanentRedirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function DefaultRedirect({
  params,
}: {
  params: { catchAll: string; lng: string };
}) {
  const post = await GetBlogPostBySlug(params.catchAll, params.lng);

  if (post === null) notFound();

  revalidatePath(`/${params.lng}/blog/${params.catchAll}`);
  permanentRedirect(`/${params.lng}/blog/article/${params.catchAll}`);
}
