import Image from "next/image";
import { useSession } from "next-auth/client";
import Container from "@/components/container";
import LoadingSpinner from "../loadingSpinner";
import { useRef } from "react";

export default function SnippetLayout({ children, frontMatter }) {
    const [session, loading] = useSession();
    const inputEl = useRef(null);
    const app = async (e) => {
        e.preventDefault();
        await fetch("/api/comment", {
            body: JSON.stringify({
                body: inputEl.current.value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        inputEl.current.value = "";
    };
    const hnd = async (e) => {
        e.preventDefault();
        await fetch("/api/comment/1234", {
            body: JSON.stringify({
                status: session,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
    };
    return (
        <Container
            title={`${frontMatter.title} - Code Snippet`}
            description="A collection of code snippets – including serverless functions, Node.js scripts, and CSS tricks."
        >
            <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
                <div className="flex justify-between w-full mb-8">
                    <div>
                        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
                            {frontMatter.title}
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300">
                            {frontMatter.description}
                        </p>
                    </div>
                    <div className="mt-2 sm:mt-0"></div>
                </div>
                <div className="prose dark:prose-dark w-full dark:text-gray-200">
                    {children}
                </div>
                {/* form created */}
                <div className="border border-blue-200 rounded p-6 my-4 w-full dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque">
                    <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
                        Sign the Guestbook
                    </h5>
                    <p className="my-1 text-gray-800 dark:text-gray-200">
                        Share a message for a future visitor of my site.
                    </p>
                    {session ? (
                        <form className="relative my-4" onSubmit={app}>
                            <input
                                ref={inputEl}
                                aria-label="Your message"
                                placeholder="Your message..."
                                required
                                className="pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                            <button
                                className="flex items-center justify-center absolute right-1 top-1 px-4 font-bold h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
                                type="submit"
                            >
                                {loading ? <LoadingSpinner /> : "Sign"}
                            </button>
                        </form>
                    ) : (
                        <a
                            className="flex items-center justify-center my-4 font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
                            href="/signin"
                        >
                            Login
                        </a>
                    )}
                    {/* {form.state === 'error' ? (
          <ErrorMessage>{form.message}</ErrorMessage>
        ) : form.state === 'success' ? (
          <SuccessMessage>{form.message}</SuccessMessage>
        ) :  */}
                    {/* ( */}
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                        Your information is only used to display your name and
                        reply by email.
                    </p>
                    {/* )} */}
                </div>
                <div className="mt-4 space-y-8 text-black">
                    entries
                    {/* {session.map((entry) => (
                        <GuestbookEntry
                            key={entry.id}
                            entry={entry}
                            user={user}
                        />
                    ))} */}
                    <button onClick={hnd}>button deneme</button>
                </div>
            </article>
        </Container>
    );
}
