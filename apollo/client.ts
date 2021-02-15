import fetch from "cross-fetch";
import { useMemo, useState, useEffect } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
// we must convert the file Buffer to a UTF-8 string
let apolloClient: any;

const authMiddleware = (authToken = "") =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        if (authToken) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${authToken}`
                }
            });
        }
        return forward(operation);
    });

function createIsomorphLink(token = "") {
    if (typeof window === "undefined") {
        const { SchemaLink } = require("@apollo/client/link/schema");
        const { schema } = require("./schema");
        return new SchemaLink({ schema });
    } else {
        const { HttpLink } = require("@apollo/client/link/http");
        const httpLink = new HttpLink({
            uri: "api/graphql",
            credentials: "same-origin",
            fetch
        });
        return authMiddleware(token).concat(httpLink);
    }
}

function createApolloClient(token = "") {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: createIsomorphLink(token),
        cache: new InMemoryCache()
    });
}

export function initializeApollo(initialState = null, token = "") {
    const _apolloClient = apolloClient ?? createApolloClient(token);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

/* istanbul ignore next */
export function useApollo(initialState: any) {
    const [token, setToken] = useState<string>("");
    useEffect(() => {
        setTimeout(() => {
            console.log("setting token");
            setToken("token");
        }, 3000);
    }, []);
    const store = useMemo(() => initializeApollo(initialState, token), [
        initialState,
        token
    ]);
    return store;
}
