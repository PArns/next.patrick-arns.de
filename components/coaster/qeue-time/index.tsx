import initTranslations from "@/components/translate/i18n";
import { getQueueInfo } from "@/data-provider/parkfan/provider";

export default async function QueueTime({
  rideId,
  locale,
}: {
  rideId: number;
  locale: string;
}) {
  const rideInfo = await getQueueInfo(rideId);
  if (!rideInfo) return null;

  const { t } = await initTranslations({
    locale: locale,
    namespaces: ["queue-time"],
  });

  if (!rideInfo.is_open) {
    return (
      <div className="flex flex-row items-center justify-center">
        <div className="mr-2 text-neutral-700 dark:text-neutral-300">
          {t("wait_time")}:
        </div>
        <div className="rounded-md bg-red-700 px-2 py-1 text-sm text-white">
          {t("closed")}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="mr-2 text-neutral-700 dark:text-neutral-300">
        {t("wait_time")}:
      </div>
      <div className="rounded-md bg-green-700 px-2 py-1 text-sm font-bold text-white">
        {rideInfo.wait_time} min.
      </div>
    </div>
  );
}
