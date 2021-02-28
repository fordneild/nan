import React from "react";
import useLogout from "../../hooks/useLogout";

export default function Logout() {
    const { logout, loading } = useLogout();
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!loading) {
            logout();
        }
    };
    return (
        <div>
            <a onClick={handleClick}>Logout</a>
        </div>
    );
}
