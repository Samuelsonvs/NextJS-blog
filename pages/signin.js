import { getProviders, getSession, signIn } from "next-auth/client";
import Container from "@/components/container";
import SvgCreator from "@/components/svgCreator";
import Swal from "sweetalert2";

const svgList = [
    [
        "Gmail",
        "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
    ],
    [
        "Github",
        "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    ],
    [
        "Twitter",
        "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    ],
];

export default function SignIn({ providers }) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const signUser = (id) => {
        Toast.fire({
            icon: "info",
            title: "Being redirecting",
        }).then(() => signIn(id));
    };
    return (
        <Container>
            <div className="flex flex-col items-center pt-10 sm:pt-20">
                <div className="p-10">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold">
                            Log in to your account
                        </h1>
                    </div>
                    <div className="flex flex-col items-center mt-10">
                        {Object.values(providers).map((provider, index) => (
                            <div
                                key={provider.name}
                                className="flex mb-4 border rounded-md"
                            >
                                <button
                                    className="button-mode button-active-effect flex py-4 px-4 text-base sm:text-lg font-medium"
                                    onClick={() => signUser(provider.id)}
                                >
                                    <SvgCreator
                                        d={svgList[index][1]}
                                        title={svgList[index][0]}
                                        heightOption={"h-6 sm:h-7"}
                                    />
                                    <span>Sign in with {provider.name}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const providers = await getProviders();
    const session = await getSession({ req });

    if (session && res && session.accessToken) {
        return {
            redirect: {
                destination: "/",
                statusCode: 302,
            },
        };
    }

    return {
        props: { providers },
    };
}
