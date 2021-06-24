import Contents from "@/components/layouts/contents";
import { getAllFilesFrontMatter } from "@/lib/mdx";

export default function React({ posts }) {
    return (
        <Contents
            posts={posts}
            url="react"
            title="React"
            explanation="The React snippet collection contains function components and reusable hooks for React 16."
        />
    );
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter("React");

    return { props: { posts } };
}
