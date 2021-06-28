import { useState } from "react";
import Link from "next/link";

import Container from "@/components/container";
import BlogPost from "@/components/blogPost";

export default function Contents({ posts, url, explanation, title }) {
    const [searchValue, setSearchValue] = useState("");
    const filteredBlogPosts = posts
        .sort(
            (a, b) =>
                Number(new Date(b.publishedAt)) -
                Number(new Date(a.publishedAt))
        )
        .filter((frontMatter) =>
            frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
        );

    return (
        <Container
            title={`Snippets - ${title}`}
            description="Thoughts on the software industry, programming, tech, videography, music, and my personal life."
        >
            <div className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
                <nav
                    className="text-black dark:text-white font-bold my-8"
                    aria-label="Breadcrumb"
                >
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <Link href="/blog">
                                <a>Blog</a>
                            </Link>
                            <svg
                                className="fill-current w-3 h-3 mx-3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                            </svg>
                        </li>
                        <li>
                            <Link href={`/blog/${url}`}>
                                <a
                                    className="text-gray-500 dark:text-gray-400"
                                    aria-current="page"
                                >
                                    {title}
                                </a>
                            </Link>
                        </li>
                    </ol>
                </nav>
                <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
                    {`${title} Snippets`}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {`${explanation}
                    In total ${posts.length} articles on this site.
                    Use the search below to filter by title.`}
                </p>
                <div className="relative w-full mb-4">
                    <input
                        aria-label="Search articles"
                        type="text"
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search articles"
                        className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <svg
                        className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
                    All Posts
                </h3>
                {!filteredBlogPosts.length && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        No posts found.
                    </p>
                )}
                {filteredBlogPosts.map((frontMatter) => (
                    <BlogPost
                        key={frontMatter.title}
                        url={url}
                        summary={frontMatter.description}
                        {...frontMatter}
                    />
                ))}
            </div>
        </Container>
    );
}
