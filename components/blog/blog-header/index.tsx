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
    <header className="relative w-full overflow-hidden rounded-lg bg-cover bg-no-repeat text-center @container/header">
      <ContentfulImageAsset
        asset={backgroundImage}
        alt={title}
        fill={true}
        quality={80}
        usePlaceholder={true}
        className="absolute bottom-0 left-0 right-0 top-0 h-max w-max object-cover"
      />
      <div className="py-10 @md/header:py-20 @lg/header:py-28">
        <div className="flex h-full items-center justify-center">
          <div className="z-10 rounded-xl border-neutral-500 bg-white/30 p-5 text-white backdrop-blur-md dark:border-neutral-600 dark:bg-neutral-800/50">
            <h1 className="mb-2 text-4xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @md/header:text-5xl @lg/header:text-6xl">
              {title}
            </h1>
            {subTitle && (
              <h2 className="text-2xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @md/header:text-3xl @lg/header:text-4xl">
                {subTitle}
              </h2>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
