import { ApolloError } from "@apollo/react-hooks";
import React from "react";

export default function QueryResult({
    children,
    loading,
    error
}: {
    children: any;
    loading: boolean;
    error: ApolloError | undefined;
}) {
    if (loading) return <p>Loading</p>;
    if (error) return <p>{error?.message}</p>;
    return <>{children}</>;
}
