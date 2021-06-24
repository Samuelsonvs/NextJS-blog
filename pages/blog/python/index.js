import Contents from "@/components/layouts/contents";
import { getAllFilesFrontMatter } from "@/lib/mdx";

export default function Python({ posts }) {
    return (
        <Contents
            posts={posts}
            url="python"
            title="Python"
            explanation="The Python snippet collection contains helper functions for Python 3.6. It includes utilities for most common data types, such as primitivies, lists, dictionaries and date objects."
        />
    );
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter("Python");

    return { props: { posts } };
}
