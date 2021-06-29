import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Navbar from "./layouts/navbar";
import Footer from "./layouts/footer";

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
        image: "",
        type: "website",
        ...customMeta,
    };

    return (
        <div className="bg-white dark:bg-black">
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="Mert Samet" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
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

            <main className="bg-white dark:bg-black px-4">
                {children}
                {/* <Footer /> */}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
