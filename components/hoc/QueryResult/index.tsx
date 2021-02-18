import { ApolloError } from "@apollo/react-hooks";
import React from "react";
import ErrorMessage from "../../ErrorMessage";

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
    if (error) return <ErrorMessage error={error} />;
    return <>{children}</>;
}
