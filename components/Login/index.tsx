import React, { useState } from "react";
import EmailPasswordForm from "../EmailPasswordForm";
import useSignUp from "./useSignUp";
import useLogin from "./useLogin";

export default function Login() {
    const login = useLogin();
    const signup = useSignUp();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const { loading, error } = isLogin ? login : signup;
    const onSubmit = isLogin ? login.login : signup.signUp;
    const active = {
        color: "green"
    };
    const text = isLogin ? "Login!" : "Sign up!";
    return (
        <>
            <p style={isLogin ? active : {}} onClick={() => setIsLogin(true)}>
                login
            </p>
            <p style={!isLogin ? active : {}} onClick={() => setIsLogin(false)}>
                signup
            </p>
            <EmailPasswordForm
                onSubmit={onSubmit}
                loading={loading}
                error={error}
                title={text}
                buttonText={text}
            />
        </>
    );
}
