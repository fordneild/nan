import React from "react";
import useLogout from "../../hooks/useLogout";

export default function Logout() {
    const { logout, loading } = useLogout();
    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        logout();
    };
    return (
        <div>
            <button disabled={loading} onClick={handleClick}>
                Logout
            </button>
        </div>
    );
}
