import Welcome, {
  generateMetadata as metaData,
} from "@/app/(desktop)/[lng]/@welcome/(.)/welcome/page";

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}) {
  return metaData({ params: params });
}

export default Welcome;
