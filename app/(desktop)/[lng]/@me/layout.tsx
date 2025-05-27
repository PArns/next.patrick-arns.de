import { Metadata } from "next";
import getMetadata from "@/components/metadata";

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  return await getMetadata(props, "me");
}

export default function MetadataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
