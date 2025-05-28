import type { CSSProperties } from "react";
import ContentfulImageAsset from "@/components/contentful/image-asset";

export type BackgroundImageData = {
  image: string;
  alt: string;
  position?: string;
};

interface Props {
  backgroundImages: BackgroundImageData[];
}

export default function BackgroundImageComponent({ backgroundImages }: Props) {
  if (!backgroundImages.length) return <div className="fixed inset-0 -z-50" />;

  const idx = Math.floor(Math.random() * backgroundImages.length);
  const background = backgroundImages[idx];

  const style: CSSProperties = {
    pointerEvents: "none",
    objectFit: "cover",
    objectPosition: (background.position || "center").toLowerCase(),
  };

  return (
    <div className="fixed inset-0 -z-50">
      <ContentfulImageAsset
        asset={background.image}
        fill
        sizes="100vw"
        alt={background.alt || ""}
        style={style}
      />
    </div>
  );
}
