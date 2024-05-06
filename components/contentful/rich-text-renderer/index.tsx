"use client";

import dynamic from "next/dynamic";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import classNames from "classnames";
import Link from "next/link";
import ContentfulImageAsset, { getImageSource } from "../image-asset";

import { showLightBoxImage } from "@/components/os/lightbox";
import PhotoGallery, { GalleryPhoto } from "@/components/photo-gallery";

const ReactPlayer = dynamic(() => import("react-player"));

function renderOptions(links: any) {
  const assetMap = new Map();
  const entryMap = new Map();

  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry);
  }

  for (const entry of links.entries.inline) {
    entryMap.set(entry.sys.id, entry);
  }

  return {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        if (!node.data.target) return <b>UNKNOWN TARGET!</b>;

        // find the entry in the entryMap by ID
        const entry = entryMap.get(node.data.target.sys.id);

        switch (entry.__typename) {
          case "BlogPostImage": {
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
            } = entry;

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
                  <p className="truncate text-xs text-neutral-500 dark:text-neutral-400 md:text-sm">
                    {name}
                  </p>
                )}
              </div>
            );
          }
          case "ImageGallery": {
            let galleryImages: GalleryPhoto[] = [];

            entry.imagesCollection.items.map((image: any) => {
              galleryImages.push({
                src: getImageSource(image, 400),
                lightboxImageSrc: getImageSource(image, 1200),
                alt: image.description,
                title: image.title,
                width: image.width,
                height: image.height,
              });
            });

            return <PhotoGallery photos={galleryImages} />;
          }
          case "BlogPostVideo": {
            return (
              <div className="flex w-auto flex-col items-center justify-center text-center">
                <ReactPlayer url={entry.videoUrl} />
                {entry.title}
              </div>
            );
          }
          default: {
            return (
              <b className="mr-2 bg-red-500">
                UNKNOWN EMBEDDED TYPE {entry.__typename}
              </b>
            );
          }
        }
      },
      [INLINES.HYPERLINK]: (node: any) => {
        const uri = node.data.uri;
        const content = node.content[0];
        return (
          <Link href={uri} target="_blank" className="external">
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
          <h1 className="clear-both pb-2 text-4xl text-neutral-600 dark:text-neutral-400 md:text-6xl">
            {children}
          </h1>
        );
      },
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        return (
          <h2 className="clear-both pb-2 text-3xl text-neutral-600 dark:text-neutral-400 md:text-5xl">
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (node: any, children: any) => {
        return (
          <h3 className="clear-both pb-2 text-2xl text-neutral-600 dark:text-neutral-400 md:text-4xl">
            {children}
          </h3>
        );
      },
      [BLOCKS.HEADING_4]: (node: any, children: any) => {
        return (
          <h4 className="clear-both pb-2 text-xl text-neutral-600 dark:text-neutral-400 md:text-3xl">
            {children}
          </h4>
        );
      },
      [BLOCKS.HEADING_5]: (node: any, children: any) => {
        return (
          <h5 className="clear-both pb-2 text-lg text-neutral-600 dark:text-neutral-400 md:text-2xl">
            {children}
          </h5>
        );
      },
      [BLOCKS.HEADING_6]: (node: any, children: any) => {
        return (
          <h6 className="text-md clear-both pb-2 text-neutral-600 dark:text-neutral-400 md:text-xl">
            {children}
          </h6>
        );
      },
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return <div className="[&:not(:last-child)]:pb-3">{children}</div>;
      },
    },
  };
}

export default function RichTextRenderer({
  document,
}: {
  document: any | null;
}) {
  if (!document) return null;
  return (
    <>
      {documentToReactComponents(document.json, renderOptions(document.links))}
    </>
  );
}
