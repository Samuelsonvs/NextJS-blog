import React from "react";

export default function Template({ navTitle, contentTitle, children }) {
    return (
        <div>
            <div>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-20 lg:px-32">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        {navTitle}
                    </h1>
                </div>

                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-20 lg:px-32">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {contentTitle}
                    </h2>
                    <div className="py-6">
                        {children}
                        {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
