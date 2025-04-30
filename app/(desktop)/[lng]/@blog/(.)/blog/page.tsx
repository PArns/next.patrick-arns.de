import BlogIndex, {
  generateMetadata as blogMetaData,
} from "@/app/(desktop)/[lng]/@blog/(.)/blog/page/[pageNumber]/page";

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}) {
  const params = await props.params;
  return blogMetaData({
    params: Promise.resolve({ lng: params.lng, pageNumber: 1, tag: undefined }),
  });
}

export default async function BlogProxy(props: {
  params: Promise<{ lng: string }>;
}) {
  const params = await props.params;
  return await BlogIndex({
    params: Promise.resolve({ lng: params.lng, pageNumber: 1, tag: undefined }),
  });
}
