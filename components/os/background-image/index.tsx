"use client";

import React, { memo, useState, useEffect, useCallback } from "react";
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

const BackgroundImageComponent = memo(function BackgroundImageComponent({
  backgroundImages,
}: Props) {
  const [background, setBackground] = useState<BackgroundImageData | null>(
    null,
  );

  useEffect(() => {
    if (backgroundImages.length === 0) return;
    const idx = Math.floor(Math.random() * backgroundImages.length);
    setBackground(backgroundImages[idx]);
  }, [backgroundImages]);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) =>
      e.currentTarget.classList.remove("opacity-0"),
    [],
  );

  if (!background) {
    return <div className="fixed inset-0 -z-50" />;
  }

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
        alt={background.alt ? background.alt : ""}
        style={style}
        className="opacity-0 transition-opacity duration-500"
        onLoad={handleLoad}
      />
    </div>
  );
});

export default BackgroundImageComponent;
