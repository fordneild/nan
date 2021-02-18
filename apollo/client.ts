import fetch from "cross-fetch";
import { useMemo, useState } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
// we must convert the file Buffer to a UTF-8 string
let apolloClient: any;

const getAuthHeaders = (token = "") => {
    if (!token) return null;
    console.log("Attaching auth heads to requests");
    return {
        authorization: `Bearer ${token}`
    };
};

function createIsomorphLink(token = "") {
    if (typeof window === "undefined") {
        const { SchemaLink } = require("@apollo/client/link/schema");
        const { schema } = require("./schema");
        return new SchemaLink({ schema });
    } else {
        const { HttpLink } = require("@apollo/client/link/http");
        return new HttpLink({
            uri: "api/graphql",
            headers: getAuthHeaders(token),
            credentials: "same-origin",
            fetch
        });
    }
}

function createApolloClient(token = "") {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: createIsomorphLink(token),
        cache: new InMemoryCache()
    });
}

export function initializeApollo(initialState: any, token = "") {
    /* make a new client if 
    there is a token (new client wuth authorized headers needed), 
        OR 
    there was no client made before (a client is needed)
    */
    const _apolloClient = createApolloClient(token);

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
export function useApollo(initialState: any, token: string) {
    const client = useMemo(() => initializeApollo(initialState, token), [
        initialState,
        token
    ]);
    return client;
}
