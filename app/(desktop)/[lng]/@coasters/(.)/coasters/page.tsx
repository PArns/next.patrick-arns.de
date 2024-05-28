import PageBaseConfiguration from "@/configuration";

export default async function Coasters({
  params,
}: {
  params: { lng: string };
}) {
  const config = PageBaseConfiguration();

  return <div>COASTERS IN DA HOUSE</div>;
}
