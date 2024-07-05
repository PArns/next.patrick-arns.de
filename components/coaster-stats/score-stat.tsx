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
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-neutral-500/60 text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        <div>{count}</div>
      </div>
    </div>
  );
}
