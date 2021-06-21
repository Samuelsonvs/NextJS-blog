import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import Navbar from "./layouts/navbar";

export default function Container(props) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), []);

    const { children, ...customMeta } = props;
    const router = useRouter();
    const meta = {
        title: "Mert Samet Atalı – Developer, creator.",
        description: `Front-end developer, JavaScript enthusiast.`,
        image: "https://leerob.io/static/images/banner.png",
        type: "website",
        ...customMeta,
    };

    return (
        <div className="bg-white dark:bg-black">
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta
                    property="og:url"
                    content={`https://leerob.io${router.asPath}`}
                />
                <link
                    rel="canonical"
                    href={`https://leerob.io${router.asPath}`}
                />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="Lee Robinson" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@leeerob" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                {meta.date && (
                    <meta
                        property="article:published_time"
                        content={meta.date}
                    />
                )}
            </Head>

            <Navbar
                cb={setTheme}
                mounted={mounted}
                resolvedTheme={resolvedTheme}
            />

            <main className="bg-white dark:bg-black">
                {children}
                {/* <Footer /> */}
            </main>
        </div>
    );
}
