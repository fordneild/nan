import { useQuery } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
import { GET_USERS_EMAILS } from "../../queries";

export default function useSearchUser() {
    const { data, loading, error } = useQuery(GET_USERS_EMAILS);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (!loading && !error && data) {
            setUsers(data.users?.map((u) => u.email));
        }
    }, [data, loading, error]);
    return { users, loading, error };
}
