import ContentfulImage from "../image";

interface ContentfulImageAssetProps {
  asset: any;
  width?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
}

export default function ContentfulImageAsset(props: ContentfulImageAssetProps) {
  const assetSrc = props?.asset?.fields?.file?.url;
  return <ContentfulImage src={assetSrc} {...props} />;
}
