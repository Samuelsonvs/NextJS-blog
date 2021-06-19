import { getProviders, getSession, signIn } from "next-auth/client";
import Container from "@/components/container";

export default function SignIn({ providers }) {
    return (
        <Container>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
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
