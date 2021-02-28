import Router from "next/router";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useSilentRefresh from "../../hooks/useSilentRefresh";
import LoginSignUp from "../../views/LoginSignUp";

export default function ProtectComponent({ children }: { children: any }) {
    const { isAuthenticated } = useAuth();
    const onError = () => {
        console.log("Error on silent refresh...");
        if (Router.pathname !== "/") {
            Router.push("/");
        }
    };
    const { loading } = useSilentRefresh(onError);
    if (isAuthenticated) {
        return <>{children}</>;
    }
    if (loading) {
        return <p>Signing you in...</p>;
    }
    return <LoginSignUp />;
}
