import Contents from "@/components/layouts/contents";
import { getAllFilesFrontMatter } from "@/lib/mdx";

export default function JavaScript({ posts }) {
  return (
    <Contents
      posts={posts}
      url="javascript"
      title="JavaScript"
      explanation="The JavaScript snippet collection contains a wide variety of ES6 helper functions. It includes helpers for dealing with primitives, arrays and objects, as well as algorithms, DOM manipulation functions and Node.js utilities."
    />
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("JavaScript");

  return { props: { posts } };
}
