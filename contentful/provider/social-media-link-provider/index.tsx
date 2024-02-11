import client from "@/contentful/client";

import {
  TypeSocialMediaLinkFields,
  TypeSocialMediaLinkSkeleton,
} from "@/contentful/types";

export async function GetSocialMediaLinks() {
  const response = await client.getEntries<TypeSocialMediaLinkSkeleton>({
    content_type: "socialMediaLink",
  });

  let res = Array<TypeSocialMediaLinkFields>();

  response.items.map((item) => {
    res.push(item.fields as unknown as TypeSocialMediaLinkFields);
  });

  return res;
}