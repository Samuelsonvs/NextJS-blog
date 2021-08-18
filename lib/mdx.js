import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { join } from "path";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";


export async function getFiles(type) {
  return readdirSync(join(process.cwd(), "mdxData", type));
}

export async function getFileBySlug(type, slug) {
  const source = slug
    ? readFileSync(join(process.cwd(), "mdxData", type, `${slug}.mdx`), "utf8")
    : readFileSync(join(process.cwd(), "mdxData", `${type}.mdx`), "utf8");

  const { code, frontMatter } =  await bundleMDX(source , {
    xdmOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options?.remarkPlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor']
            }
          }
        ]
      ];
      return options;
    }
  });

  return {
    code,
    frontMatter: {
      wordCount: source.split(/\s+/gu).length,
      slug: slug || null,
      ...frontMatter,
    },
  };
}

export async function getAllFilesFrontMatter(type) {
  const files = readdirSync(join(process.cwd(), "mdxData", type));

  return files.reduce((allPosts, postSlug) => {
    const source = readFileSync(
      join(process.cwd(), "mdxData", type, postSlug),
      "utf8"
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(".mdx", ""),
      },
      ...allPosts,
    ];
  }, []);
}
