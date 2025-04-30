export type QueueTime = {
  id: number;
  name: string;
  is_open: boolean;
  wait_time: number;
  last_updated: string;
};

export async function getQueueInfo(
  parkId: number,
  rideId: number,
): Promise<QueueTime | null> {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 10 : 60 * 15, // 15 min Cache Time
      tags: ["queue-time"],
    },
  };

  try {
    const response = await fetch(
      `https://queue-times.com/parks/${parkId}/queue_times.json`,
      requestOptions,
    );

    if (!response.ok) {
      console.error(`Failed to fetch data for parkId ${parkId}`);
      return null;
    }

    const data = await response.json();

    // Search for the rideId in the JSON structure
    for (const land of data.lands) {
      const ride = land.rides.find((r: any) => r.id === rideId);
      if (ride) {
        return {
          id: ride.id,
          name: ride.name,
          is_open: ride.is_open,
          wait_time: ride.wait_time,
          last_updated: ride.last_updated,
        };
      }
    }

    // If rideId is not found in lands, check top-level rides
    const topLevelRide = data.rides?.find((r: any) => r.id === rideId);
    if (topLevelRide) {
      return {
        id: topLevelRide.id,
        name: topLevelRide.name,
        is_open: topLevelRide.is_open,
        wait_time: topLevelRide.wait_time,
        last_updated: topLevelRide.last_updated,
      };
    }

    console.warn(`Ride with id ${rideId} not found in park ${parkId}`);
    return null;
  } catch (error) {
    console.error("Error fetching coaster stats:", error);
    return null;
  }
}
