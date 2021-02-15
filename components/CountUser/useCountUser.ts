import { useQuery } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
import { GET_USER_COUNT } from "../../queries";

export default function useSearchUser() {
    const { data, loading, error } = useQuery(GET_USER_COUNT);
    const [userCount, setUserCount] = useState<number>(0);
    useEffect(() => {
        if (!loading && !error && data) {
            setUserCount(data.userCount);
        }
    }, [data, loading, error]);
    return { userCount, loading, error };
}
