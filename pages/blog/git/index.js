import Contents from "@/components/layouts/contents";
import { getAllFilesFrontMatter } from "@/lib/mdx";

export default function Git({ posts }) {
  return (
    <Contents
      posts={posts}
      url="git"
      title="Git"
      explanation="The Git snippet collection contains a variety of short tips and tricks for all currently maintained versions of git. It includes most commonly-used commands and covers various use-cases in the form of simplified documentation, complete with multiple examples."
    />
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("Git");

  return { props: { posts } };
}
