import BlogIndex, { generateMetadata as metaData } from "./(.)/blog/page";

export async function generateMetadata() {
  return metaData();
}

export default BlogIndex;
