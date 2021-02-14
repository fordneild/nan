import QueryResult from "../QueryResult";
import useSearchUser from "./useSearchUser";

export default function SearchUser() {
    const { users, loading, error } = useSearchUser();
    return (
        <QueryResult loading={loading} error={error}>
            {JSON.stringify(users)}
        </QueryResult>
    );
}
