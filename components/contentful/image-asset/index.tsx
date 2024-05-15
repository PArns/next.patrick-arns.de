import { EntryFieldTypes } from "contentful/dist/types/types/entry";
import Image from "next/image";
import { CSSProperties } from "react";

interface ContentfulImageAssetProps {
  asset: any;
  alt: string | EntryFieldTypes.Symbol;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  fill?: boolean;
  maxImageWidth?: number;
  style?: CSSProperties;
  sizes?: string;
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
    ...rest
  } = props;

  const imageSource = getImageSource(asset, width ?? maxImageWidth ?? 1980);
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
      {...rest}
    />
  );
}
