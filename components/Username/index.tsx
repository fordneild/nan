import React from "react";
import QueryResult from "../hoc/QueryResult";
import useUsername from "./useUsername";

export default function Username() {
    const { data, error, loading } = useUsername();
    return (
        <div>
            <QueryResult error={error} loading={loading}>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </QueryResult>
        </div>
    );
}
