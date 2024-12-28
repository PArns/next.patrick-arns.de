import clsx from "clsx";
import Image from "next/image";
import { ReactElement, ReactNode } from "react";

export default function BlogAlternateLanguageLink({
  alternatives,
  locale,
}: {
  alternatives: { [key: string]: string };
  locale: string;
}) {
  if (locale !== "en" && alternatives["en"])
    return (
      <BlogAlternative locale="en" altLink={alternatives["en"]}>
        This article is also available in english!
      </BlogAlternative>
    );
  else if (locale !== "de" && alternatives["de"])
    return (
      <BlogAlternative locale="de" altLink={alternatives["de"]}>
        Dieser Artikel ist auch auf deutsch verfügbar!
      </BlogAlternative>
    );
}

function BlogAlternative({
  locale,
  altLink,
  children,
}: {
  locale: string;
  altLink: string;
  children: ReactNode;
}) {
  return (
    <a href={altLink} className="flex flex-row pb-2 external opacity-70 hover:opacity-100">
      <div >
        <Image
          src={`/flags/${locale}.png`}
          width={26}
          height={1}
          alt="Language"
          className="mr-2 pt-[6px]"
        />
      </div>
      <div>{children}</div>
    </a>
  );
}
