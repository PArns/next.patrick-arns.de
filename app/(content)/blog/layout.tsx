import IFrameDetect from "@/components/os/iframe-detect";

export default function IFrameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <IFrameDetect />
    </>
  );
}
