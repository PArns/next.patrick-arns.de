import Clock from "../clock";

import LanguageSwitcher from "../language-switcher";
import ThemeSwitcher from "../theme-switch";
import ActiveAppBar from "./active-app";

export default function TitleBar({ pageName }: { pageName: string }) {
  return (
    <div className="flex flex-row bg-white/50 px-1 drop-shadow-sm backdrop-blur-lg dark:bg-neutral-800/50">
      <div className="flex-none">
        <div className="flex flex-row">
          <ActiveAppBar pageName={pageName} />
        </div>
      </div>
      <div className="grow"></div>
      <div
        className="hidden flex-none pt-[1px] pr-2 md:block"
        aria-hidden="true"
      >
        <Clock timeFormat="hh-mm" />
      </div>
      <div className="flex-none" aria-hidden="true">
        <ThemeSwitcher />
      </div>
      <div className="flex-none">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
