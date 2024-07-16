import clsx from "clsx";

export default function ScoreStat({
  title,
  count,
  className,
}: {
  title: string;
  count: string;
  className?: string;
}) {
  const classNames = clsx("flex flex-col w-[250px] h-28", className);

  return (
    <div className={classNames}>
      <div>
        <h3 className="mb-1 font-bold">{title}</h3>
      </div>
      <div className="flex h-full w-full items-center justify-center rounded-lg border-neutral-400 bg-neutral-100/40 text-4xl font-bold text-neutral-800 drop-shadow-lg dark:bg-neutral-900/40 dark:text-white">
        <div>{count}</div>
      </div>
    </div>
  );
}
