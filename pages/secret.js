import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";

export default function Secret() {
    const [session, loading] = useSession();
    const [content, setContent] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/secret");
            const json = await res.json();

            if (json.content) {
                setContent(json.content);
            } else {
                setContent(json.error);
            }
        };
        fetchData();
    }, [session]);

    if (typeof window !== "undefined" && loading) return null;
    if (!session) {
        return (
            <div>
                <h1>{content}</h1>
            </div>
        );
    }
    return (
        <div>
            <h1>Protected Page</h1>
            <p>{content}</p>
            <Link href="/">
                <a>Back to Home Page</a>
            </Link>
        </div>
    );
}
