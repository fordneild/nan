import QueryResult from "../QueryResult";
import useSearchUser from "./useSearchUser";

export default function SearchUser() {
    const { users, loading, error } = useSearchUser();
    return (
        <QueryResult loading={loading} error={error}>
            <ul>
                {users.map(({ email, userId }, index) => {
                    return (
                        <li key={index}>
                            {userId} {email}
                        </li>
                    );
                })}
            </ul>
        </QueryResult>
    );
}
