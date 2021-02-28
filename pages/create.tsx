import React from "react";
import ProtectComponent from "../hoc/ProtectComponent";
import CreateComponent from "../views/Create";
export default function Create() {
    return (
        <ProtectComponent>
            <CreateComponent />
        </ProtectComponent>
    );
}
