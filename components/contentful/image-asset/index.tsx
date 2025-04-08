import Image from "next/image";
import { CSSProperties } from "react";
import ClientImage from "./client-image";
import clsx from "clsx";

export interface ContentfulImageAssetProps {
  asset: any;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  fill?: boolean;
  maxImageWidth?: number;
  style?: CSSProperties;
  sizes?: string;
  lightbox?: boolean;
  [key: string]: any; // For other props that might be passed
}

export function getImageSource(asset: any, width: number, quality?: number) {
  let assetSrc = asset?.url;

  if (!assetSrc) {
    assetSrc = asset?.SRC?.url;
  }

  if (!assetSrc) {
    return "";
  }

  const imageSource = assetSrc.startsWith("//")
    ? "https:" + assetSrc
    : assetSrc;

  const fullSource = `${imageSource}?w=${width}&q=${quality ?? 90}`;

  return fullSource;
}

export function getImageAssetId(asset: any) {
  return asset?.sys?.id;
}

export default function ContentfulImageAsset(props: ContentfulImageAssetProps) {
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
    className,
    ...rest
  } = props;

  const imageSource = getImageSource(asset, width ?? maxImageWidth ?? 1980);
  if (!Boolean(imageSource) || imageSource === undefined) return <></>;

  if (lightbox) {
    const classes = clsx(className, "cursor-zoom-in");

    return (
      <ClientImage
        alt={alt.toString()}
        asset={asset}
        width={width}
        height={height}
        src={imageSource}
        priority={priority}
        fill={fill}
        quality={quality}
        style={style}
        sizes={sizes}
        lightbox={true}
        className={classes}
        {...rest}
      />
    );
  }

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
      className={className}
      {...rest}
    />
  );
}
