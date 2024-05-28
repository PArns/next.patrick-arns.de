import Image from "next/image";

import CoasterCloudLogo from "@/public/images/CoasterCloud.png";

export default function PoweredByCoasterCloud() {
  return (
    <div className="relative mt-4">
      <a
        className="absolute -bottom-2 -right-2 flex w-full place-content-end pt-2 text-xs text-neutral-500"
        href="https://coaster.cloud"
        target="_blank"
        title="Powered by coaster.cloud"
      >
        <div>Powered by</div>
        <div>
          <Image
            src={CoasterCloudLogo}
            alt="coaster.cloud Logo"
            width={20}
            className="-mt-1 ml-1 grayscale"
          />
        </div>
      </a>
    </div>
  );
}
