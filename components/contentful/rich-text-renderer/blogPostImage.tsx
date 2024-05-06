"use client";

import classNames from "classnames";
import ContentfulImageAsset, { getImageSource } from "../image-asset";
import { showLightBoxImage } from "@/components/os/lightbox";

export default function BlogPostImage({ imageData }: { imageData: any }) {
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
  } = imageData;

  const styleObject = styles ? JSON.parse(styles.internal.content) : {};

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

  if (maxWidth && maxWidth > 0) styleObject["maxWidth"] = `${maxWidth}px`;

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
