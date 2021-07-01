import Contents from "@/components/layouts/contents";
import { getAllFilesFrontMatter } from "@/lib/mdx";

export default function NodeJs({ posts }) {
  return (
    <Contents
      posts={posts}
      url="nodejs"
      title="NodeJs"
      explanation="The Node.js snippet collection contains JavaScript utilities for Node.js 14.x. It includes helper functions related to server-side code and filesystem operations, while general-purpose helpers can be found in the JavaScript snippet collection."
    />
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("NodeJs");

  return { props: { posts } };
}
