import Link from "next/link";

export default function BlogIndex() {
  return (
    <div className="flex flex-col">
      <div>Blog page index</div>
      <div>
        <Link href="/blog/test">Test</Link>
      </div>
    </div>
  );
}
