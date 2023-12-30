"use client";

import { TypeBackgroundImagesFields } from "@/api/types";
import ContentfulImageAsset from "@/components/contentful/image-asset";
import { useEffect, useState } from "react";

const randomGenerator = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function BackgroundImage({
  backgroundImages,
}: {
  backgroundImages: TypeBackgroundImagesFields[];
}) {
  const [background, setBackground] = useState<TypeBackgroundImagesFields>();

  const bgImage = {
    pointerEvents: "none",
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
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
    <>
      {background && (
        <ContentfulImageAsset
          asset={background.image}
          alt={background.name || "Background"}
          width={1500}
          height={1500}
          style={bgImage}
        />
      )}
    </>
  );
}
