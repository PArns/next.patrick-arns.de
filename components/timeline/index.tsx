import clsx from "clsx";
import { Fragment } from "react";

import {
  RocketLaunchIcon,
  HomeIcon,
  CheckIcon,
  FlagIcon,
} from "@heroicons/react/16/solid";

interface ITimeLineItem {
  title: string;
  time: string;
  icon: "rocket" | "home" | "check" | "flag";
  isActive?: boolean;
  children: React.ReactNode;
}

export default function TimeLine({
  children,
  className,
}: {
  children: Array<React.ReactElement<ITimeLineItem>>;
  className?: string;
}) {
  return (
    <div className={clsx("w-full @container/timeline", className)}>
      <div className="relative mx-auto space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-neutral-300 before:to-transparent @2xl/timeline:before:mx-auto @2xl/timeline:before:translate-x-0 dark:before:via-neutral-700">
        {children.map((child, index) => (
          <Fragment key={index}>{child}</Fragment>
        ))}
      </div>
    </div>
  );
}

const iconMap = {
  rocket: RocketLaunchIcon,
  home: HomeIcon,
  check: CheckIcon,
  flag: FlagIcon,
};

export const TimeLineItem: React.FunctionComponent<ITimeLineItem> = ({
  title,
  time,
  icon,
  isActive,
  children,
}) => {
  const IconComponent = iconMap[icon];

  return (
    <div
      className={clsx(
        "group relative flex items-center justify-between @2xl/timeline:justify-normal @2xl/timeline:odd:flex-row-reverse",
        { "is-active": isActive },
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-neutral-300 text-neutral-500 shadow group-first:!mt-0 group-[.is-active]:bg-emerald-500 group-[.is-active]:text-emerald-50 @2xl/timeline:order-1 @2xl/timeline:-mt-36 @2xl/timeline:group-odd:-translate-x-1/2 @2xl/timeline:group-even:translate-x-1/2 dark:border-neutral-800 dark:bg-neutral-600 dark:text-neutral-300 dark:group-[.is-active]:bg-emerald-600">
        <IconComponent className="h-5 w-5" />
      </div>

      <div className="w-[calc(100%-4rem)] rounded-lg bg-white p-4 drop-shadow-lg group-first:!mt-0 @2xl/timeline:-mt-36 @2xl/timeline:w-[calc(50%-2.5rem)] dark:bg-neutral-800">
        <div className="mb-1 flex items-center justify-between space-x-2">
          <div className="font-bold text-neutral-900 dark:text-neutral-100">
            {title}
          </div>
          <time className="font-caveat font-medium text-neutral-500 dark:text-neutral-300">
            {time}
          </time>
        </div>
        <div className="text-neutral-700 dark:text-neutral-300">{children}</div>
      </div>
    </div>
  );
};
