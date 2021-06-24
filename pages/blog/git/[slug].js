import { MDXRemote } from "next-mdx-remote";
import { getFiles, getFileBySlug } from "@/lib/mdx";
import SnippetLayout from "@/components/layouts/blog";

export default function Category({ mdxSource, frontMatter }) {
    return (
        <SnippetLayout frontMatter={frontMatter}>
            <MDXRemote {...mdxSource} />
        </SnippetLayout>
    );
}

export async function getStaticPaths() {
    const posts = await getFiles("Git");

    return {
        paths: posts.map((p) => ({
            params: {
                slug: p.replace(/\.mdx/, ""),
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const post = await getFileBySlug("Git", params.slug);

    return { props: { ...post } };
}
