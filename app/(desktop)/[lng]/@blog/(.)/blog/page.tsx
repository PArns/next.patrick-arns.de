import BlogIndex, {
  generateMetadata as blogMetaData,
} from "@/app/(desktop)/[lng]/@blog/(.)/blog/page/[pageNumber]/page";
import PageBaseConfiguration from "@/configuration";

export async function generateStaticParams() {
  const config = PageBaseConfiguration();
  return config.supportedLocales.map((lng: string) => ({ lng }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ lng: string }>;
  }
) {
  const params = await props.params;
  return blogMetaData({
    params: Promise.resolve({ lng: params.lng, pageNumber: 1, tag: undefined, fromProxy: true }),
  });
}

export default async function BlogProxy(
  props: {
    params: Promise<{ lng: string }>;
  }
) {
  const params = await props.params;
  return await BlogIndex({
    params: Promise.resolve({ lng: params.lng, pageNumber: 1, tag: undefined, fromProxy: true }),
  });
}
