"use client";

import ContentfulImageAsset from "@/components/contentful/image-asset";
import { CSSProperties, useEffect, useState } from "react";

const randomGenerator = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export type BackgroundImageData = {
  image: string;
  alt: string;
  position: string | undefined;
}

export default function BackgroundImage({
  backgroundImages,
}: {
  backgroundImages: BackgroundImageData[];
}) {
  const [background, setBackground] = useState<BackgroundImageData>();

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
          sizes="100vw"
          alt={"Background Image"}
          style={bgImage}
          className="opacity-0 transition-all duration-500"
          onLoad={(image: any) => {
            image.currentTarget.classList.remove("opacity-0");
          }}
        />
      )}
    </div>
  );
}
