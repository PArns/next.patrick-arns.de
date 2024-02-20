"use client";

import { TypeBackgroundImagesFields } from "@/contentful/types";
import ContentfulImageAsset from "@/components/contentful/image-asset";
import { CSSProperties, useEffect, useState } from "react";

const randomGenerator = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function BackgroundImage({
  backgroundImages,
}: {
  backgroundImages: TypeBackgroundImagesFields[];
}) {
  const [background, setBackground] = useState<TypeBackgroundImagesFields>();

  const bgImage: CSSProperties = {
    pointerEvents: "none",
    objectFit: "cover",
    objectPosition: (
      (background?.position || "center") as string
    ).toLowerCase(),
  };

  useEffect(() => {
    const getRandomBackgroundImageData = () => {
      const randomPosition = randomGenerator(0, backgroundImages.length - 1);
      return backgroundImages[randomPosition];
    };

    const backgroundImage = getRandomBackgroundImageData();
    setBackground(backgroundImage);
  }, [backgroundImages]);

  return (
    <div className="fixed inset-0 -z-50">
      {background && (
        <ContentfulImageAsset
          asset={background.image}
          fill={true}
          alt={background.name || "Background"}
          style={bgImage}
          usePlaceholder={true}
        />
      )}
    </div>
  );
}
