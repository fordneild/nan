import { useState } from "react";
import useLogin from "./useLogin";
import useSignUp from "./useSignUp";

export default function useLoginSignUp() {
    const login = useLogin();
    const signup = useSignUp();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const { loading, error } = isLogin ? login : signup;
    const onSubmit = ({
        email,
        password
    }: {
        email: string;
        password: string;
    }) => {
        if (isLogin) {
            login.login(email, password);
        } else {
            signup.signUp(email, password);
        }
    };
    return { onSubmit, loading, error, isLogin, setIsLogin };
}
