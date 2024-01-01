import PhotoAlbum, { Photo, RenderPhotoProps } from "react-photo-album";
import Image from "next/image";
import { showLightBoxImage } from "../os/lightbox";
import classNames from "classnames";

export interface GalleryPhoto extends Photo {
  lightboxImageSrc: string;
}

function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps<GalleryPhoto>) {
  const galleryPhoto = photo as GalleryPhoto;
  const imageClasses = classNames(className, "cursor-zoom-in");

  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Image
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        className={imageClasses}
        onClick={(e) => {
          if (onClick) onClick(e);

          showLightBoxImage({
            src: galleryPhoto.lightboxImageSrc,
            title: title ? title : alt,
          });
        }}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <PhotoAlbum
      photos={photos}
      layout="rows"
      renderPhoto={NextJsImage}
      defaultContainerWidth={1200}
      spacing={10}
      sizes={{
        size: "calc(100vw - 40px)",
        sizes: [
          {
            viewport: "(max-width: 299px)",
            size: "calc(100vw - 10px)",
          },
          {
            viewport: "(max-width: 599px)",
            size: "calc(100vw - 20px)",
          },
          {
            viewport: "(max-width: 1199px)",
            size: "calc(100vw - 30px)",
          },
        ],
      }}
    />
  );
}
