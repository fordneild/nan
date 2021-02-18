import React from "react";
import useAuth from "../../../hooks/useAuth";
import useSilentRefresh from "../../../hooks/useSilentRefresh";
import Login from "../../Login";

export default function ProtectComponent({ children }: { children: any }) {
    const { isAuthenticated } = useAuth();
    const { loading } = useSilentRefresh();
    if (isAuthenticated) {
        return <>{children}</>;
    }
    if (loading) {
        return <p>Signing you in...</p>;
    }
    return <Login />;
}
