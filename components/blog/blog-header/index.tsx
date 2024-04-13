import ContentfulImageAsset from "@/components/contentful/image-asset";

export default function BlogHeader({
  title,
  subTitle,
  backgroundImage,
}: {
  title: string;
  subTitle?: string;
  backgroundImage: any;
}) {
  return (
    <div className="@container/header relative w-full overflow-hidden rounded-lg bg-cover bg-no-repeat text-center">
      <ContentfulImageAsset
        asset={backgroundImage}
        alt={title}
        fill={true}
        quality={80}
        usePlaceholder={true}
        className="absolute bottom-0 left-0 right-0 top-0 h-max w-max object-cover"
      />
      <div className="@md/header:py-20 @lg/header:py-28 py-10">
        <div className="flex h-full items-center justify-center">
          <div className="text-white">
            <h1 className="@md/header:text-5xl @lg/header:text-6xl mb-2 text-4xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {title}
            </h1>
            {subTitle && (
              <h2 className="@md/header:text-3xl @lg/header:text-4xl text-2xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {subTitle}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
