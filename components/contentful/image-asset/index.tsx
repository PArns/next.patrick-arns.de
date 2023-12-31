import { EntryFieldTypes } from "contentful/dist/types/types/entry";
import ContentfulImage from "../image";

interface ContentfulImageAssetProps {
  asset: any;
  alt: string | EntryFieldTypes.Symbol;
  width?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
}

export default function ContentfulImageAsset(props: ContentfulImageAssetProps) {
  const { alt, asset, ...rest } = props;
  const assetSrc = asset?.fields?.file?.url;

  return <ContentfulImage alt={alt.toString()} src={assetSrc} {...rest} />;
}
