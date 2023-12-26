"use client";

import React, { useEffect, useState } from "react";
import {
  TypeBackgroundImagesFields,
  TypeSocialMediaLinkFields,
} from "@/api/types";

import ContentfulImageAsset from "@/components/contentful/image-asset";

import Taskbar from "../taskbar";
import TitleBar from "../titlebar";
import IconContainer from "../icon-container";

const randomGenerator = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function Desktop({
  children,
  backgroundImages,
  socialMediaLinks,
  pageName,
}: {
  children: React.ReactNode;
  backgroundImages: TypeBackgroundImagesFields[];
  socialMediaLinks?: TypeSocialMediaLinkFields[];
  pageName: string;
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
    function getRandomBackgroundImageData() {
      const randomPosition = randomGenerator(0, backgroundImages.length - 1);
      const background = backgroundImages[randomPosition];

      return background;
    }

    const backgroundImage = getRandomBackgroundImageData();
    setBackground(backgroundImage);
  }, [background, backgroundImages]);

  return (
    <div className="w-screen h-screen flex flex-col">
      {background && (
        <ContentfulImageAsset
          asset={background.image}
          alt={background.name}
          width={1500}
          height={1500}
          style={bgImage}
        />
      )}
      <div className="flex-none">
        <TitleBar pageName={pageName} />
      </div>
      <div className="flex-grow flex">
        <IconContainer socialMediaLinks={socialMediaLinks} />
        {children}
      </div>
      <div className="flex-none">
        <Taskbar socialMediaLinks={socialMediaLinks} />
      </div>
    </div>
  );
}
