import client from "@/api/client";

import {
  TypeBackgroundImagesFields,
  TypeBackgroundImagesSkeleton,
} from "@/api/types";

export async function GetBackgroundImages() {
  const response = await client.getEntries<TypeBackgroundImagesSkeleton>({
    content_type: "backgroundImages",
  });

  let res = Array<TypeBackgroundImagesFields>();

  response.items.map((item) => {
    res.push(item.fields as unknown as TypeBackgroundImagesFields);
  });

  return res;
}
