import type { Metadata } from "next";

import UnderConstruction from "@/app/_apps/underconstruction";

export async function generateMetadata(): Promise<Metadata> {
  const page = UnderConstruction();

  return {
    title: page.props.title,
  };
}

export default function DummyPage() {
  return null;
}
