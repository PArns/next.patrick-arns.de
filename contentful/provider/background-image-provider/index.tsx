import client from "@/contentful/client";
import { cache } from "react";

import {
  TypeBackgroundImagesFields,
  TypeBackgroundImagesSkeleton,
} from "@/contentful/types";

export const GetBackgroundImages = cache(async () => {
  const response = await client
    .getEntries<TypeBackgroundImagesSkeleton>({
      content_type: "backgroundImages",
    });
  let res = Array<TypeBackgroundImagesFields>();
  
  response.items.map((item) => {
    res.push(item.fields as unknown as TypeBackgroundImagesFields);
  });

  return res;
});
