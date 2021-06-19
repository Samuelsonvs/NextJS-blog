import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class">
            {" "}
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
