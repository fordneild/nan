import QueryResult from "../QueryResult";
import useCountUser from "./useCountUser";

export default function CountUser() {
    const { userCount, loading, error } = useCountUser();
    return (
        <QueryResult loading={false} error={error}>
            <p>Number of users is : {loading ? "loading..." : userCount}</p>
        </QueryResult>
    );
}
