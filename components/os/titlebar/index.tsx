import Clock from "../clock";

export default function TitleBar({ pageName }: { pageName: string }) {
  return (
    <div className="backdrop-blur-lg bg-white/50 flex flex-row px-2">
      <div className="flex-none">{pageName}</div>
      <div className="flex-grow"></div>
      <div className="flex-none"><Clock timeFormat="hh-mm" /></div>
    </div>
  );
}
