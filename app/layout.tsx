export { generateMetadata } from "@/components/layout/root-layout";

export default async function DummyRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
