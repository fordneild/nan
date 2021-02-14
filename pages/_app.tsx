// import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";

export default function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
