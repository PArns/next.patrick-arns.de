"use client";

import { showLightBoxImage } from "@/components/os/lightbox";
import { ContentfulImageAssetProps, getImageSource } from ".";
import Image from "next/image";

export default function ClientImage(props: ContentfulImageAssetProps) {
  const {
    alt,
    asset,
    width,
    height,
    quality,
    priority,
    fill,
    maxImageWidth,
    style,
    usePlaceholder,
    sizes,
    lightbox,
    ...rest
  } = props;

  const imageSource = getImageSource(asset, width ?? maxImageWidth ?? 1980);
  const lightboxImageSoure = getImageSource(asset, 1980);

  if (!Boolean(imageSource) || imageSource === undefined) return <></>;

  return (
    <Image
      alt={alt.toString()}
      width={width}
      height={height}
      src={imageSource}
      priority={priority}
      fill={fill}
      quality={quality}
      style={style}
      sizes={sizes}
      onClick={() => {
        showLightBoxImage({
          src: lightboxImageSoure,
          title: alt.toString(),
        });
      }}
      {...rest}
    />
  );
}
