import BlogIndex from "@/app/(desktop)/[lng]/@blog/(.)/blog/page/[pageNumber]/page";

export default async function BlogProxy({
  params,
}: {
  params: { lng: string };
}) {
  return await BlogIndex({ params: { lng: params.lng, pageNumber: 1 } });
}
