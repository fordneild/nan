import { useLazyQuery } from "@apollo/react-hooks";
import Router from "next/router";
import { useEffect } from "react";
import { LOGIN_WITH_REFRESH_TOKEN } from "../queries";
import useAuth from "./useAuth";

export default function useSilentRefresh() {
    const { isAuthenticated, setToken } = useAuth();
    const [query, queryState] = useLazyQuery(LOGIN_WITH_REFRESH_TOKEN, {
        onError: () => {
            console.log("Error on silent refresh...");
            console.log({ path: Router.pathname });
            if (Router.pathname !== "/") {
                Router.push("/");
            }
        }
    });
    const token = queryState.data?.loginWithRefreshToken?.token;
    useEffect(() => {
        if (token && token !== "") {
            setToken(token);
        }
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated) {
            try {
                query();
            } catch (error) {}
        }
    }, [isAuthenticated]);

    return { ...queryState };
}
