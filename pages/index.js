import { signIn, signOut, useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";

import Navbar from "@/components/layouts/navbar";
import Container from "@/components/container";

export default function Page() {
    const [session, loading] = useSession();

    console.log(session);

    return (
        <Container>
            <div>
                <div>
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Dashboard
                        </h1>
                    </div>

                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                        </div>
                        {/* /End replace */}
                    </div>
                </div>
            </div>
        </Container>
    );
}
