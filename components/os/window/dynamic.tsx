import dynamic from "next/dynamic";

const DynamicWindow = dynamic(
  () => import("./index").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default DynamicWindow;
