import { fetchGraphQL } from "@/contentful/client";

export async function GetSocialMediaLinks() {
  const data = await fetchGraphQL(
    `query {
      socialMediaLinkCollection {
          items {
            name
            title
            icon {
              url
            }
            link
            order
          }
        }
      }`
  );

  const collection = data.data.socialMediaLinkCollection;
  return collection.items;
}
