import React from "react";
import EmailPasswordForm from "./EmailPasswordForm";
import useLoginSignUp from "./useLoginSignUp";
import style from "./LoginSignUp.module.scss";

export default function Login() {
    const { onSubmit, loading, error, isLogin, setIsLogin } = useLoginSignUp();
    const text = isLogin ? "Login!" : "Sign up!";
    return (
        <div className={style.container}>
            <div className={style.loginSignUpToggle}>
                <p
                    className={isLogin ? style.active : ""}
                    onClick={() => setIsLogin(true)}
                >
                    Login!
                </p>
                <p
                    className={isLogin ? "" : style.active}
                    onClick={() => setIsLogin(false)}
                >
                    Sign Up!
                </p>
            </div>
            <EmailPasswordForm
                onSubmit={onSubmit}
                loading={loading}
                error={error}
                header={text}
                buttonText={text}
            />
        </div>
    );
}
