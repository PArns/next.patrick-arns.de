import { fetchGraphQL } from "@/data-provider/contentful/client";

export async function GetBackgroundImages() {
  const data = await fetchGraphQL(
    `query {
      backgroundImagesCollection(order: name_DESC) {
          items {
            name
            position
            image {
              url
              width
              height
            }
          }
        }
      }`
  );

  const collection = data.data.backgroundImagesCollection;
  return collection.items;
}
