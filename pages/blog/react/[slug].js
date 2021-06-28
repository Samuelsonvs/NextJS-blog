import { MDXRemote } from "next-mdx-remote";
import { getFiles, getFileBySlug } from "@/lib/mdx";
import SnippetLayout from "@/components/layouts/blog";
import comments from "@/lib/commentSchema";
import connectDB from "@/lib/mongodb";

export default function Category({ mdxSource, frontMatter, allComment }) {
    return (
        <SnippetLayout frontMatter={frontMatter} allComment={allComment}>
            <MDXRemote {...mdxSource} />
        </SnippetLayout>
    );
}

export async function getStaticPaths() {
    const posts = await getFiles("React");

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
    const post = await getFileBySlug("React", params.slug);
    await connectDB();

    const allComment = await comments.find({ subject: params.slug });

    return {
        props: { ...post, allComment: JSON.parse(JSON.stringify(allComment)) },
    };
}
