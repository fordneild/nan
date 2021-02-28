import { ApolloError } from "@apollo/react-hooks";
import React from "react";
import ErrorMessage from "../../components/ErrorMessage";

export default function QueryResult({
    children,
    loading,
    error,
    //data for debug purposes only
    data
}: {
    children: any;
    loading: boolean;
    error: ApolloError | undefined;
    data?: any;
}) {
    if (loading) return <p>Loading</p>;
    if (error) return <ErrorMessage error={error} />;
    return (
        <>
            <pre>{data && JSON.stringify(data, null, 2)}</pre>
            {children}
        </>
    );
}
