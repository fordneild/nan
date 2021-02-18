import React from "react";
import ProtectComponent from "../components/hoc/ProtectComponent";
import Username from "../components/Username";
import Logout from "../components/Logout";

export default function Home() {
    return (
        <ProtectComponent>
            <Logout />
            <h1>Home Page</h1>
            <Username />
        </ProtectComponent>
    );
}
