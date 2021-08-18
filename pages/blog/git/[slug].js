import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getFiles, getFileBySlug } from "@/lib/mdx";
import SnippetLayout from "@/components/layouts/blog";
import comments from "@/db/commentSchema";
import connectDB from "@/db/mongodb";

export default function Category({ code, frontMatter, allComment }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <SnippetLayout frontMatter={frontMatter} allComment={allComment}>
      <Component />
    </SnippetLayout>
  );
}

export async function getStaticPaths(slug) {
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
  await connectDB();

  const allComment = await comments.find({ subject: params.slug });

  return {
    props: { ...post, allComment: JSON.parse(JSON.stringify(allComment)) },
  };
}
