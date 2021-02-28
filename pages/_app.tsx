import AuthProvider from "../hoc/AuthProvider";
import ApolloProvider from "../hoc/ApolloProvider";
import MainLayout from "../hoc/MainLayout";
import "../styles/globalStyles.scss";

export default function App({
    Component,
    pageProps
}: {
    Component: any;
    pageProps: any;
}) {
    return (
        <>
            <AuthProvider
                initialToken={pageProps?.initialToken}
                initialApolloState={pageProps?.initalApolloState}
            >
                <ApolloProvider>
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                </ApolloProvider>
            </AuthProvider>
        </>
    );
}
