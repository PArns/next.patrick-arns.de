export type RideStatistic = {
  image: string;
  facets: Facet[];
  parkVisits: PaginatedParkVisits;
  attractionRides: PaginatedAttractionRides;
  manufacturerRides: PaginatedManufacturerRides;
  parkTrips: PaginatedParkTrips;
  accountRankingParks: PaginatedAccountRanking;
  accountRankingAttractions: PaginatedAccountRanking;
  accountRankingRides: PaginatedAccountRanking;
  fastestRide: PaginatedFastestRide;
  longestRide: PaginatedLongestRide;
  highestRide: PaginatedHighestRide;
  strongestRide: PaginatedStrongestRide;
  counts: Count[];
  rideFacts: RideFact[];
};

export type Facet = {
  key: string;
  terms: Term[];
};

export type Term = {
  key: string;
  label: string;
  quantity: number;
};

export type PaginatedParkVisits = {
  pagination: Pagination;
  items: ParkVisit[];
};

export type Pagination = {
  totalItems: number;
};

export type ParkVisit = {
  park: Park;
  totalVisits: number;
  totalRides: number;
};

export type Park = {
  id: string;
  name: string;
  slug: string;
  images: Image[];
};

export type Image = {
  url: string;
  social: string;
  contributor: Contributor;
  customCopyrightName: string | null;
  customCopyrightUrl: string | null;
  license: License;
  date: DateValue;
};

export type Contributor = {
  username: string;
  slug: string;
};

export type License = {
  name: string;
  url: string;
};

export type DateValue = {
  value: string;
};

export type PaginatedAttractionRides = {
  pagination: Pagination;
  items: AttractionRide[];
};

export type AttractionRide = {
  attraction: Attraction;
  totalRides: number;
  highScore: number | null;
};

export type Attraction = {
  id: string;
  name: string;
  slug: string;
  images: Image[];
  category: Category;
  scoringSystem: ScoringSystem | null;
};

export type Category = {
  label: string;
};

export type ScoringSystem = {
  label: string;
  scale: number;
};

export type PaginatedManufacturerRides = {
  pagination: Pagination;
  items: ManufacturerRide[];
};

export type ManufacturerRide = {
  manufacturer: Manufacturer;
  totalRides: number;
  totalUniqueRides: number;
};

export type Manufacturer = {
  id: string;
  name: string;
  slug: string;
};

export type PaginatedParkTrips = {
  pagination: Pagination;
  items: ParkTrip[];
};

export type ParkTrip = {
  park: Park;
  date: TripDate;
};

export type TripDate = {
  format: string;
  value: string;
};

export type PaginatedAccountRanking = {
  pagination: Pagination;
  items: AccountRanking[];
};

export type AccountRanking = {
  account: Account;
  totalParks: number;
  totalAttractions: number;
  totalRides: number;
  position: number;
};

export type Account = {
  id: string;
  username: string;
  slug: string;
};

export type PaginatedFastestRide = {
  items: FastestRide[];
};

export type FastestRide = {
  attraction: FastestAttraction;
  totalRides: number;
};

export type FastestAttraction = {
  id: string;
  name: string;
  slug: string;
  attribute: Attribute;
  images: Image[];
};

export type Attribute = {
  valueAsString: string;
};

export type PaginatedLongestRide = {
  items: LongestRide[];
};

export type LongestRide = {
  attraction: LongestAttraction;
  totalRides: number;
};

export type LongestAttraction = {
  id: string;
  name: string;
  slug: string;
  attribute: Attribute;
  images: Image[];
};

export type PaginatedHighestRide = {
  items: HighestRide[];
};

export type HighestRide = {
  attraction: HighestAttraction;
  totalRides: number;
};

export type HighestAttraction = {
  id: string;
  name: string;
  slug: string;
  attribute: Attribute;
  images: Image[];
};

export type PaginatedStrongestRide = {
  items: StrongestRide[];
};

export type StrongestRide = {
  attraction: StrongestAttraction;
  totalRides: number;
};

export type StrongestAttraction = {
  id: string;
  name: string;
  slug: string;
  attribute: Attribute;
  images: Image[];
};

export type Count = {
  key: string;
  label: string;
  value: number;
};

export type RideFact = {
  key: string;
  label: string;
  value: number;
  valueAsString: string;
};

export async function fetchCoasterStats(): Promise<RideStatistic | null> {
  // You can get your UserID & AuthToken from the official coaster.cloud website!
  // Just login, grab your cookie and URLDecode it
  const requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");
  requestHeaders.append("Origin", "http://localhost");
  requestHeaders.append("Referer", "http://localhost/");
  requestHeaders.append("X-APP-DEVICE", "mobile");
  requestHeaders.append("X-Requested-With", "cloud.coaster.mobile");
  requestHeaders.append(
    "X-AUTH-TOKEN",
    process.env.COASTERCLOUD_AUTH_TOKEN || "",
  );

  const raw = JSON.stringify({
    query: "730c08c5-6a03-4c50-8544-2b97754161aa",
    variables: {
      id: process.env.COASTERCLOUD_USER_ID,
      locale: "en",
      itemsPerPage: 5,
      filter: {},
      facet: [
        "PARK_CATEGORY",
        "ATTRACTION_CATEGORY",
        "PARK",
        "COUNTRY",
        "MANUFACTURER",
      ],
      systemOfUnits: [
        "kilometers_per_hour",
        "celsius",
        "centimeter",
        "meter",
        "kilometer",
        "square_meter",
        "hectar",
      ],
    },
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: requestHeaders,
    body: raw,
    redirect: "follow",
    next: {
      revalidate: 60 * 60 * 24, // 24H Cache Time
      tags: ["coaster"],
    },
  };

  try {
    const response = await fetch(
      "https://data.coaster.cloud/v1",
      requestOptions,
    );

    const result = await response.json();
    const statistics = result.data.entity.rideStatistic;
    return statistics;
  } catch (error) {
    console.error("Error fetching coaster stats:", error);
    return null;
  }
}
