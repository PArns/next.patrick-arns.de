import Image, { ImageLoaderProps } from "next/image";

interface ContentfulImageProps {
  src: string;
  alt: string;
  width?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
}

export default function ContentfulImage(props: ContentfulImageProps) {
  const { alt, src, width, height, quality, ...rest } = props;

  const imageSource = src.startsWith("//") ? "https:" + src : src;
  const fullSource = `${imageSource}?w=${width}&q=${quality || 75}`;

  return (
    <Image alt={alt} width={width} height={height} src={fullSource} {...rest} />
  );
}
