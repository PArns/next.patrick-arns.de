export type QueueTime = {
  id: number;
  name: string;
  is_open: boolean;
  wait_time: number;
  last_updated: string;
};

export async function getQueueInfo(rideId: number): Promise<QueueTime | null> {
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
      `https://api.park.fan/rides/${rideId}`,
      requestOptions,
    );

    if (!response.ok) {
      console.error(`Failed to fetch data for rideId ${rideId}`);
      return null;
    }

    const ride = await response.json();
    const queueTime = ride.currentQueueTime;

    return {
      id: ride.id,
      name: ride.name,
      is_open: queueTime.isOpen,
      wait_time: queueTime.waitTime,
      last_updated: queueTime.lastUpdated,
    };
  } catch (error) {
    console.error("Error fetching coaster stats:", error);
    return null;
  }
}
