import { fetchGraphQL } from "@/data-provider/contentful/client";
import { LocaleCode } from "contentful";

export interface TopParks {
  parks: TopPark[];
  total: number;
  limit: number;
}

export interface TopPark {
  name: string;
  rank: string;
  description: any;
  image: any;
}

export async function GetTopParks({
  locale,
}: {
  locale: LocaleCode;
}): Promise<TopParks | null> {
  const data = await fetchGraphQL(
    `query ($limit: Int!, $locale: String!) {
  topParksCollection(order: rank_ASC, limit: $limit, locale: $locale) {
    total
    limit
    items {
      name
      rank
      description {
        json
        links {
          entries {
            inline {
              sys {
                id
              }
            }
            block {
              sys {
                id
              }
              __typename
            }
          }
          assets {
            block {
              sys {
                id
              }
              url
              title
              width
              height
              description
            }
          }
        }
      }
      image {
        url
      }
    }
  }
}`,
    { limit: 3, locale: locale },
  );

  const parks = data?.data?.topParksCollection;

  if (!parks) return null;

  const parkList: TopPark[] = parks.items.map((parkEntry: any) => {
    return {
      name: parkEntry.name,
      rank: parkEntry.rank,
      description: parkEntry.description,
      image: parkEntry.image,
    };
  });

  return {
    parks: parkList,
    total: parks.total,
    limit: parks.limit,
  };
}
