import Image from "next/image";

import CoasterCloudLogo from "@/public/images/CoasterCloud.png";

export default function PoweredByCoasterCloud() {
  return (
    <div className="relative mt-7 grayscale hover:grayscale-0">
      <a
        className="absolute -bottom-2 -right-2 flex w-full place-content-end pt-2 text-sm text-neutral-900 dark:text-neutral-300"
        href="https://coaster.cloud"
        target="_blank"
        title="Powered by coaster.cloud"
      >
        <div className="pr-0.5">Powered by</div>
        <div>
          <Image
            src={CoasterCloudLogo}
            alt="coaster.cloud Logo"
            width={26}
            className="-mt-1 ml-1"
          />
        </div>
      </a>
    </div>
  );
}
