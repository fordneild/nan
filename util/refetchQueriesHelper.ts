import { DocumentNode } from "@apollo/react-hooks";
export default function refetchQueriesHelper(queries: DocumentNode[]) {
    return queries.map((q) => {
        return { query: q };
    });
}
