import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAuthQuery from "../../hooks/useAuthQuery";
import { GET_USERNAME } from "../../queries";
export default function useUsername() {
    const { data, loading, error } = useAuthQuery(GET_USERNAME);
    useEffect(() => {
        console.log("get username data:" + data);
    }, []);
    return { loading, error, data };
}
