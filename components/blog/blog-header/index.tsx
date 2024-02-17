import ContentfulImageAsset from "@/components/contentful/image-asset";

export default function BlogHeader({
  title,
  subTitle,
  backgroundImage,
}: {
  title: string;
  subTitle: string;
  backgroundImage: any;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-48 text-center">
      <ContentfulImageAsset
        asset={backgroundImage}
        alt={title}
        fill={true}
        quality={80}
        usePlaceholder={true}
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
        <div className="flex h-full items-center justify-center">
          <div className="text-white">
            <h1 className="mb-2 text-6xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {title}
            </h1>
            <h2 className="text-4xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {subTitle}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
