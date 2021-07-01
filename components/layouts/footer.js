import SvgCreator from "../svgCreator";
import NewsletterSubscribe from "@/lib/newsletterSubscribe";

const navigation = [
    ["Home", "/"],
    ["Blog", "/blog"],
    ["JavaScript", "/blog/javascript"],
    ["Css", "/blog/css"],
    ["React", "/blog/react"],
    ["Git", "/blog/git"],
    ["NodeJs", "/blog/nodejs"],
    ["Python", "/blog/python"],
];

export default function Footer() {
    return (
        <div className="mt-24 overflow-hidden ">
            <div className=" mx-auto">
                <div className="sm:flex sm:mt-8">
                    <div className="mt-8  sm:mt-0 sm:w-full sm:px-8 flex flex-col justify-between text-center">
                        <div className="flex justify-evenly border-t-2 border-gray-300 py-5">
                            <div className="flex flex-col sm:flex">
                                {navigation.slice(0, 2).map((state, index) => {
                                    return (
                                        <div key={index} className="my-2">
                                            <a
                                                href={state[1]}
                                                className="text-gray-600  text-md dark:text-gray-200"
                                            >
                                                {state[0]}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex flex-col sm:flex  sm:justify-between">
                                {navigation.slice(2, 8).map((state, index) => {
                                    return (
                                        <div key={index} className="my-2">
                                            <a
                                                href={state[1]}
                                                className="text-gray-600  text-md dark:text-gray-200"
                                            >
                                                {state[0]}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <NewsletterSubscribe />
                        <div className="flex flex-row justify-center mt-10">
                            <div className="my-2">
                                <a
                                    href="https://twitter.com/samuelsonvs"
                                    target="_blank"
                                >
                                    <SvgCreator
                                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                                        title="Twitter"
                                        heightOption={"h-7 sm:h-10"}
                                    />
                                </a>
                            </div>
                            <div className="my-2 ">
                                <a
                                    href="https://github.com/Samuelsonvs"
                                    target="_blank"
                                >
                                    <SvgCreator
                                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                        title="Github"
                                        heightOption={"h-7 sm:h-10"}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="text-gray-400  text-xs mb-10 mt-5">
                            This blog powered by NextJs
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6">
                <div className="mt-10 border-t-2 border-gray-300 flex flex-col items-center">
                    <div className="sm:w-2/3 text-center py-6">
                        <p className="text-base text-gray-600 dark:text-gray-200 font-bold mb-2">
                            © 2021 by Mert Samet Atalı
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
