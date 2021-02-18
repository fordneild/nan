import { useEffect } from "react";
import { LOGIN } from "../../queries";
import { useLazyQuery } from "@apollo/react-hooks";
import useAuth from "../../hooks/useAuth";

export default function useLogin() {
    const [loginQuery, queryState] = useLazyQuery(LOGIN);
    const { setToken } = useAuth();

    const token = queryState.data?.login?.token;
    useEffect(() => {
        if (token && token !== "") {
            setToken(token);
        }
    }, [token]);

    const login = (email: string, password: string) => {
        try {
            loginQuery({
                variables: {
                    email,
                    password
                }
            });
        } catch (error) {}
    };

    return { login, ...queryState };
}
