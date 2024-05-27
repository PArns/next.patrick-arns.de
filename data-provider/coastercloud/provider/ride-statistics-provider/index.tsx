import { RideStatistic } from "../../types/TypeRideStatistics";

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
      revalidate: 60 * 60 * 6, // 6H Cache Time
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
