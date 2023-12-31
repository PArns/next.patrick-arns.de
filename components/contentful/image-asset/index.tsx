import { EntryFieldTypes } from "contentful/dist/types/types/entry";
import Image from "next/image";

interface ContentfulImageAssetProps {
  asset: any;
  alt: string | EntryFieldTypes.Symbol;
  width: number;
  height: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
}

export default function ContentfulImageAsset(props: ContentfulImageAssetProps) {
  const { alt, asset, width, height, quality, ...rest } = props;
  const assetSrc = asset?.fields?.file?.url;

  const imageSource = assetSrc.startsWith("//")
    ? "https:" + assetSrc
    : assetSrc;

  const fullSource = `${imageSource}?w=${width}&q=${quality || 75}`;

  return (
    <Image alt={alt.toString()} width={width} height={height} src={fullSource} {...rest} />
  );
}
