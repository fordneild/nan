import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useApollo } from "../../../apollo/client";
import { ApolloProvider as CoreApolloProvider } from "@apollo/react-hooks";

export default function ApolloProvider({ children }: { children: any }) {
    const { apolloClient } = useAuth();
    if (!apolloClient) {
        return <>No Apollo Client Defined!</>;
    }
    return (
        <CoreApolloProvider client={apolloClient}>
            {children}
        </CoreApolloProvider>
    );
}
