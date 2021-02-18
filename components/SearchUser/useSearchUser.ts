import { useEffect, useState } from "react";
import { GET_USERS_EMAILS } from "../../queries";
import usePolledQuery from "../../hooks/usePolledQuery";

const POLL_INTERVAL_SECONDS = 5;

export default function useSearchUser() {
    const { data, loading, error } = usePolledQuery(
        GET_USERS_EMAILS,
        POLL_INTERVAL_SECONDS
    );
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (!loading && !error && data) {
            setUsers(
                data?.User.map(({ email }: any) => ({
                    email
                })).sort(
                    (
                        { email: emailA }: { email: any },
                        { email: emailB }: { email: any }
                    ) => emailA.localeCompare(emailB)
                )
            );
            // setUsers(data.User);
        }
    }, [data, loading, error]);
    return { users, loading, error };
}
