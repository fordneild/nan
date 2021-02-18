import QueryResult from "../hoc/QueryResult";
import useSearchUser from "./useSearchUser";

export default function SearchUser() {
    const { users, loading, error } = useSearchUser();
    return (
        <QueryResult loading={loading} error={error}>
            <ul>
                {users.map(({ email }, index) => {
                    return <li key={index}>{email}</li>;
                })}
            </ul>
        </QueryResult>
    );
}
