"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  BLOCKS,
  INLINES,
  Inline,
  Document as RichTextDocument,
} from "@contentful/rich-text-types";

import classNames from "classnames";
import Link from "next/link";
import ContentfulImageAsset, {
  getImageSource,
  getImageAssetId,
} from "../image-asset";

import { showLightBoxImage } from "@/components/os/lightbox";

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
            }

            if (floatingDirection)
              classes.push(`float-${floatingDirection.toLowerCase()}`);

            if (maxWidth && maxWidth > 0)
              styleObject["maxWidth"] = `${maxWidth}px`;

            const subTitleClasses = classNames(
              "flex flex-col text-center w-max",
              {
                "float-left": classes.indexOf("float-left") > -1,
                "pr-4": classes.indexOf("float-left") > -1,
                "float-right": classes.indexOf("float-right") > -1,
                "pl-4": classes.indexOf("float-right") > -1,
              }
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
                  styles={styleObject}
                  onClick={() => {
                    if (useLightBox) {
                      showLightBoxImage({
                        src: getImageSource(image, 1980),
                        title: name,
                      });
                    }
                  }}
                />
                {showSubtitle && (
                  <span className="text-sm text-gray-500">{name}</span>
                )}
              </div>
            );
          }
          case "imageGallery": {
            return (
              <div className="clear-both flex justify-center">
                <div className="xl:w-5/6">GALLERY PENDING</div>
              </div>
            );
          }
          default: {
            return (
              <b className="bg-red-500 mr-2">
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
          <h1 className="clear-both text-6xl text-gray-600">{children}</h1>
        );
      },
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        return (
          <h2 className="clear-both text-5xl text-gray-600">{children}</h2>
        );
      },
      [BLOCKS.HEADING_3]: (node: any, children: any) => {
        return (
          <h3 className="clear-both text-4xl text-gray-600">{children}</h3>
        );
      },
      [BLOCKS.HEADING_4]: (node: any, children: any) => {
        return (
          <h4 className="clear-both text-3xl text-gray-600">{children}</h4>
        );
      },
      [BLOCKS.HEADING_5]: (node: any, children: any) => {
        return (
          <h5 className="clear-both text-2xl text-gray-600">{children}</h5>
        );
      },
      [BLOCKS.HEADING_6]: (node: any, children: any) => {
        return <h6 className="clear-both text-xl text-gray-600">{children}</h6>;
      },
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return <div className="pb-3">{children}</div>;
      },
    },
  };

  return <>{documentToReactComponents(document, renderOptions)}</>;
}
