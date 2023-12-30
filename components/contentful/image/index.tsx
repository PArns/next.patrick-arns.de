import Image, { ImageLoaderProps } from "next/image";

interface ContentfulImageProps {
  src: string;
  alt: string;
  width?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
}

const contentfulLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage(props: ContentfulImageProps) {
  const { alt, ...rest } = props;
  return <Image alt={alt} loader={contentfulLoader} {...rest} />;
}
