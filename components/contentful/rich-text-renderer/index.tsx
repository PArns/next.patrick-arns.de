"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  BLOCKS,
  INLINES,
  Document as RichTextDocument,
} from "@contentful/rich-text-types";

import classNames from "classnames";
import Link from "next/link";
import ContentfulImageAsset, { getImageSource } from "../image-asset";

import { showLightBoxImage } from "@/components/os/lightbox";
import PhotoGallery, { GalleryPhoto } from "@/components/photo-gallery";

export default function RichTextRenderer({
  document,
}: {
  document: RichTextDocument | null;
}) {
  if (!document) return null;

  const renderOptions = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        if (!node.data.target) return <b>UNKNOWN TARGET!</b>;
        const contentType = node.data.target.sys.contentType.sys.id as string;
        const fields = node.data.target.fields;

        switch (contentType) {
          case "blogPostImage": {
            let {
              useDefaultStyle,
              floatingDirection,
              maxWidth,
              classes,
              imageClasses,
              styles,
              showSubtitle,
              useLightBox,
              image,
              name,
            } = fields;

            const styleObject = styles
              ? JSON.parse(styles.internal.content)
              : {};

            classes = classes || [];
            imageClasses = imageClasses || [];

            classes.push("object-cover");

            if (showSubtitle) classes.push("mb-1");

            if (useDefaultStyle) {
              classes.push("border");
              classes.push("rounded-lg");
              classes.push("drop-shadow-lg");

              imageClasses.push("rounded-lg");
              imageClasses.push("xl:w-full");
              imageClasses.push("md:w-60");
              imageClasses.push("w-40");
            }

            if (floatingDirection)
              classes.push(`float-${floatingDirection.toLowerCase()}`);

            if (maxWidth && maxWidth > 0)
              styleObject["maxWidth"] = `${maxWidth}px`;

            const subTitleClasses = classNames(
              "flex flex-col text-center items-center justify-center w-auto",
              {
                "float-left": classes.indexOf("float-left") > -1,
                "pr-4": classes.indexOf("float-left") > -1,
                "float-right": classes.indexOf("float-right") > -1,
                "pl-4": classes.indexOf("float-right") > -1,
              },
            );

            if (useLightBox) {
              imageClasses.push("cursor-zoom-in");
            }

            return (
              <div className={subTitleClasses}>
                <ContentfulImageAsset
                  asset={image}
                  width={500}
                  height={500}
                  alt={name}
                  className={imageClasses.join(" ")}
                  style={styleObject}
                  onClick={() => {
                    if (useLightBox) {
                      showLightBoxImage({
                        src: getImageSource(image, 1200),
                        title: name,
                      });
                    }
                  }}
                />
                {showSubtitle && (
                  <p className="truncate text-xs text-gray-500 md:text-sm">
                    {name}
                  </p>
                )}
              </div>
            );
          }
          case "imageGallery": {
            let galleryImages: GalleryPhoto[] = [];

            fields.images.map((image: any) => {
              galleryImages.push({
                src: getImageSource(image, 400),
                lightboxImageSrc: getImageSource(image, 1200),
                alt: image.fields.description,
                title: image.fields.title,
                width: image.fields.file.details.image.width,
                height: image.fields.file.details.image.height,
              });
            });

            return <PhotoGallery photos={galleryImages} />;
          }
          default: {
            return (
              <b className="mr-2 bg-red-500">
                UNKNOWN EMBEDDED TYPE {contentType}
              </b>
            );
          }
        }
      },
      [INLINES.HYPERLINK]: (node: any) => {
        const uri = node.data.uri;
        const content = node.content[0];
        return (
          <Link href={uri} target="_blank" rel="noreferrer">
            {content.value}
          </Link>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        return (
          <ContentfulImageAsset
            asset={node.data.target}
            width={500}
            height={500}
            alt={node.data.target.fields.description}
          />
        );
      },
      [BLOCKS.HEADING_1]: (node: any, children: any) => {
        return (
          <h1 className="clear-both pb-2 text-4xl text-gray-600 md:text-6xl">
            {children}
          </h1>
        );
      },
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        return (
          <h2 className="clear-both pb-2 text-3xl text-gray-600 md:text-5xl">
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (node: any, children: any) => {
        return (
          <h3 className="clear-both pb-2 text-2xl text-gray-600 md:text-4xl">
            {children}
          </h3>
        );
      },
      [BLOCKS.HEADING_4]: (node: any, children: any) => {
        return (
          <h4 className="clear-both pb-2 text-xl text-gray-600 md:text-3xl">
            {children}
          </h4>
        );
      },
      [BLOCKS.HEADING_5]: (node: any, children: any) => {
        return (
          <h5 className="clear-both pb-2 text-lg text-gray-600 md:text-2xl">
            {children}
          </h5>
        );
      },
      [BLOCKS.HEADING_6]: (node: any, children: any) => {
        return (
          <h6 className="text-md clear-both pb-2 text-gray-600 md:text-xl">
            {children}
          </h6>
        );
      },
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return <div className="[&:not(:last-child)]:pb-3">{children}</div>;
      },
    },
  };

  return <>{documentToReactComponents(document, renderOptions)}</>;
}
