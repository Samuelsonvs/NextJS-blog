import Image from "next/image";
import { session, useSession } from "next-auth/client";
import Container from "@/components/container";
import LoadingSpinner from "../loadingSpinner";
import SuccessMessage from "@/components/successMessage";
import ErrorMessage from "@/components/errorMessage";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import fetcher from "@/lib/fetcher";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import { format } from "date-fns";
import Swal from "sweetalert2";

const CommentEntry = ({ post, uri, commentSession, formSetter }) => {
  const deleteComment = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Warning!",
      showConfirmButton: true,
      showDenyButton: true,
      denyButtonText: "cancel",
      text: "Do you want to continue",
      icon: "warning",
      confirmButtonText: "Im sure",
    }).then(async (result) => {
      if (result.isConfirmed) {
        (() => {
          return new Promise(async (resolve, reject) => {
            await fetch(`/api/comment/${uri}`, {
              body: JSON.stringify({
                status: commentSession,
                id: post._id,
              }),
              method: "DELETE",
            })
              .then((response) => {
                resolve(response);
                mutate(`/api/comment/${uri}`);
                formSetter(false);
              })
              .catch((err) => {
                reject(err);
              });
          });
        })()
          .then(() => {
            Swal.fire("Deleted!", "", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (result.isDenied) {
        Swal.fire("Comment not deleted", "", "info");
      }
    });
  };

  return (
    <li className="mt-10">
      <div className="flex">
        <div className="mr-5">{post.name}</div>
        <div>{format(new Date(post.createdAt), "d MMM yyyy 'at' h:mm bb")}</div>
        <div>
          {commentSession && commentSession.user.name === post.name && (
            <>
              <span className="text-gray-200 dark:text-gray-800">/</span>
              <button
                className="text-sm text-red-600 dark:text-red-400"
                onClick={deleteComment}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      <div className="text-lg font-semibold mt-3 text-black dark:text-white">
        {post.body}
      </div>
    </li>
  );
};

export default function SnippetLayout({ children, frontMatter, allComment }) {
  const [form, setForm] = useState(false);
  const router = useRouter();
  const history = router.pathname.split("/")[2];
  const uri = router.query.slug;
  const [session, loading] = useSession();
  const inputEl = useRef(null);
  const { data: entries } = useSWR(`/api/comment/${uri}`, fetcher, {
    initialData: allComment,
  });
  const app = async (e) => {
    e.preventDefault();
    setForm({ state: "loading" });
    const res = await fetch(`/api/comment/${uri}`, {
      body: JSON.stringify({
        status: session,
        body: inputEl.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();

    if (error) {
      setForm({
        state: "error",
        message: error,
      });
      return;
    }

    inputEl.current.value = "";
    mutate(`/api/comment/${uri}`);
    setForm({
      state: "success",
      message: `Thanks for comments.`,
    });
  };
  return (
    <Container
      title={`${frontMatter.title} - Code Snippet`}
      description="A collection of code snippets – including serverless functions, Node.js scripts, and CSS tricks."
    >
      <article className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16 w-full">
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
            <li className="flex items-center">
              <Link href={`/blog/${history}`}>
                <a className="capitalize">{history}</a>
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
              <Link href={`/blog/${history}/${uri}`}>
                <a
                  className="text-gray-500 dark:text-gray-400"
                  aria-current="page"
                >
                  {frontMatter.title}
                </a>
              </Link>
            </li>
          </ol>
        </nav>
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
        <div className="prose dark:prose-dark w-full dark:text-gray-200 max-w-none">
          {children}
        </div>
        {/* form created */}
        <div className="border border-blue-200 rounded p-6 my-4 w-full dark:border-gray-800 bg-blue-50 dark:bg-gray-900">
          <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
            Sign for comment
          </h5>
          <p className="my-1 text-gray-800 dark:text-gray-200">
            You can write your questions about the subject below.
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
                {form.state === "loading" ? <LoadingSpinner /> : "Sign"}
              </button>
            </form>
          ) : (
            <Link href="/signin">
              <a className="flex items-center justify-center my-4 font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28">
                Login
              </a>
            </Link>
          )}
          {form.state === "error" ? (
            <ErrorMessage>{form.message}</ErrorMessage>
          ) : form.state === "success" ? (
            <SuccessMessage>{form.message}</SuccessMessage>
          ) : (
            <p className="text-sm text-gray-800 dark:text-gray-200">
              Your information is only used to display your name and reply by
              email.
            </p>
          )}
        </div>
        <div className="mt-4 space-y-8 text-gray-500 dark:text-gray-400">
          <ul>
            {entries?.map((post, index) => (
              <CommentEntry
                key={index}
                post={post}
                uri={uri}
                commentSession={session}
                formSetter={setForm}
              />
            ))}
          </ul>
        </div>
      </article>
    </Container>
  );
}
