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
