import Link from "next/link";

export default function BlogOverlay({ params }: { params: { slug: string } }) {
  return (
    <>
      SLUG {params.slug}
      <br />
      <Link href="/blog">Back to index</Link>{" "}
    </>
  );
}
