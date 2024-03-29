import { BlogTeaserSpecific } from "@/components/blog/blog-teaser";
import initTranslations from "@/components/translate/i18n";

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}) {
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["titles"],
  });

  return {
    title: t("aboutMe"),
  };
}

export default function AboutMe({ params }: { params: { lng: string } }) {
  return (
    <div className="container mx-auto">
      <article className="m-4 rounded-md bg-white p-4 dark:bg-neutral-800">
        <h1 className="mb-2 text-2xl">More to come!</h1>
        <p>This page is under construction ...</p><br/>
        <BlogTeaserSpecific locale={params.lng} postId="3L8OVL4Eq4SRF2DPRcGvcR" />
      </article>
    </div>
  );
}
