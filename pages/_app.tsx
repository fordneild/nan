import AuthProvider from "../components/hoc/AuthProvider";
import ApolloProvider from "../components/hoc/ApolloProvider";

export default function App({
    Component,
    pageProps
}: {
    Component: any;
    pageProps: any;
}) {
    return (
        <AuthProvider
            initialToken={pageProps?.initialToken}
            initialApolloState={pageProps?.initalApolloState}
        >
            <ApolloProvider>
                <Component {...pageProps} />
            </ApolloProvider>
        </AuthProvider>
    );
}
