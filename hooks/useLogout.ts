import { useLazyQuery } from "@apollo/react-hooks";
import Router from "next/router";

import { LOGOUT } from "../queries";
import useAuth from "./useAuth";

export default function useLogout() {
    const { isAuthenticated, setToken } = useAuth();
    const [logoutQuery, logoutQueryState] = useLazyQuery(LOGOUT, {
        onCompleted: (data: any) => {
            console.log({ data });
            if (data?.logout?.ok) {
                setToken("");
            }
        }
    });
    const logout = () => {
        if (isAuthenticated) {
            try {
                logoutQuery();
            } catch (error) {}
        }
    };
    return { logout, ...logoutQueryState };
}
