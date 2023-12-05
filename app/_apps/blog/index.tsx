import Window from "@/components/os/window";

export default function Blog() {
  return (
    <Window
      sortIndex={1}
      width="50%"
      height="50%"
      route="/blog"
      title="Blog"
      icon="/appicons/blog.png"
    >
      <div className="m-10">
       BLOG!
      </div>
    </Window>
  );
}