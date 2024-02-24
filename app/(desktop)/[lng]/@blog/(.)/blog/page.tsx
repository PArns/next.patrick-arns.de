import BlogIndex, {
  generateMetadata as blogMetaData,
} from "@/app/(desktop)/[lng]/@blog/(.)/blog/page/[pageNumber]/page";

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}) {
  return await blogMetaData({ params: { lng: params.lng, pageNumber: 1, tag: undefined } });
}

export default async function BlogProxy({
  params,
}: {
  params: { lng: string };
}) {
  return await BlogIndex({ params: { lng: params.lng, pageNumber: 1, tag: undefined } });
}
