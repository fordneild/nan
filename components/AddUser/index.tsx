import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../../mutations";
import { GET_USERS_EMAILS } from "../../queries";
import useAddUser from "./useAddUser";

export default function AddUser() {
    const [emailValue, setEmailValue] = useState<string>("");
    const addUser = useAddUser();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addUser(emailValue);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    };

    return (
        <form action="none" onSubmit={handleSubmit}>
            <input
                onChange={handleChange}
                value={emailValue}
                type="text"
                placeholder="email"
            ></input>
            <button>Add User!</button>
        </form>
    );
}
