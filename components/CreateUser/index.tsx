import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import useAddUser from "./useCreateUsers";

export default function AddUser() {
    const [emailValue, setEmailValue] = useState<string>("");
    const { addUser, loading, error, mutationError } = useAddUser();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addUser(emailValue);
        setEmailValue("");
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
            <button disabled={loading}> Add User!</button>
            {error && <ErrorMessage error={error} />}
        </form>
    );
}
