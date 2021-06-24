import { getAllFilesFrontMatter } from "@/lib/mdx";
import Contents from "@/components/layouts/contents";

export default function Css({ posts }) {
    return (
        <Contents
            posts={posts}
            url="css"
            title="Css"
            explanation="The CSS snippet collection contains utilities and interactive examples for CSS3.
    It includes modern techniques for creating commonly-used layouts,
    styling and animating elements, as well as snippets for handling user interactions."
        />
    );
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter("Css");

    return { props: { posts } };
}
