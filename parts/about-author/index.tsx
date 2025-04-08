import Translate from "@/components/translate";
import Image from "next/image";

import TranslateSwitch, {
  Translation,
} from "@/components/translate/translate-switch";
import AppLink from "@/components/os/app-link";

import ProfilePic from "@/public/images/profilePic2.jpg";

export default function AboutAuthor({ lng }: { lng: string }) {
  return (
    <aside className="flex flex-col rounded-lg bg-white p-4 drop-shadow-lg dark:bg-neutral-800">
      <div className="pb-2 text-xl">
        <Translate id="aboutAuthor" locale={lng} ns="blog" />
      </div>
      <Image
        className="mx-auto h-32 w-32 rounded-full"
        width={128}
        height={128}
        src={ProfilePic}
        alt="Profile picture"
      />
      <h2 className="mt-3 text-center text-2xl font-semibold">Patrick Arns</h2>
      <p className="text-center">Software Engineer</p>

      <div className="mt-2">
        <TranslateSwitch locale={lng}>
          <Translation lang="de">
            Patrick schrieb die ersten Zeilen Code für{" "}
            <a
              href="https://cyberghostvpn.com"
              className="external"
              target="_blank"
            >
              CyberGhost
            </a>{" "}
            im Jahr 2003 und arbeitet für die{" "}
            <a href="https://kape.com" className="external" target="_blank">
              Kape PLC
            </a>
            , zu der{" "}
            <a
              href="https://cyberghostvpn.com"
              className="external"
              target="_blank"
            >
              CyberGhost
            </a>{" "}
            mittlerweile gehört.
          </Translation>
          <Translation lang="en">
            Patrick wrote the first lines of code for{" "}
            <a
              href="https://cyberghostvpn.com"
              className="external"
              target="_blank"
            >
              CyberGhost
            </a>{" "}
            in 2003 and works for{" "}
            <a href="https://kape.com" className="external" target="_blank">
              Kape PLC
            </a>
            , which{" "}
            <a
              href="https://cyberghostvpn.com"
              className="external"
              target="_blank"
            >
              CyberGhost
            </a>{" "}
            is now part of.
          </Translation>
        </TranslateSwitch>
      </div>

      <div className="mt-2">
        <AppLink href={`/${lng}/me`} id="me" className="text-sky-500">
          <Translate id="profileMore" locale={lng} ns="blog" />
        </AppLink>
      </div>
    </aside>
  );
}
