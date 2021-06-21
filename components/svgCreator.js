import React from "react";

export default function SvgCreator({ d, title, heightOption }) {
    return (
        <svg
            className={`pr-4 dark:text-white ${heightOption}`}
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>{title}</title>

            <path fill="currentColor" d={d} />
        </svg>
    );
}
