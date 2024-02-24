import client from "@/contentful/client";
import { cache } from "react";

import {
  TypeSocialMediaLinkFields,
  TypeSocialMediaLinkSkeleton,
} from "@/contentful/types";

export const GetSocialMediaLinks = cache(async () => {
  const response = await client.getEntries<TypeSocialMediaLinkSkeleton>({
    content_type: "socialMediaLink",
  });

  let res = Array<TypeSocialMediaLinkFields>();

  response.items.map((item) => {
    res.push(item.fields as unknown as TypeSocialMediaLinkFields);
  });

  return res;
});
