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

export interface TopCoasters {
  coaster: TopCoaster[];
  total: number;
  limit: number;
}

export interface TopCoaster {
  name: string;
  park: string;
  parkId: number;
  rideId: number;
  rank: string;
  description: any;
  image: any;
  coasterCloudId: string;
}

export async function GetTopCoasters({
  locale,
}: {
  locale: LocaleCode;
}): Promise<TopCoasters | null> {
  const data = await fetchGraphQL(
    `query ($limit: Int!, $locale: String!) {
  topCoasterCollection(order: rank_ASC, limit: $limit, locale: $locale) {
    total
    limit
    items {
      name
      rank
      park
      coasterCloudId
      parkId
      rideId
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

  const coaster = data?.data?.topCoasterCollection;

  if (!coaster) return null;

  const coasterList: TopCoaster[] = coaster.items.map((coasterEntry: any) => {
    return {
      name: coasterEntry.name,
      park: coasterEntry.park,
      parkId: coasterEntry.parkId,
      rideId: coasterEntry.rideId,
      coasterCloudId: coasterEntry.coasterCloudId,
      rank: coasterEntry.rank,
      description: coasterEntry.description,
      image: coasterEntry.image,
    };
  });

  return {
    coaster: coasterList,
    total: coaster.total,
    limit: coaster.limit,
  };
}
