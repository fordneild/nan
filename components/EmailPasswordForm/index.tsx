import { ApolloError } from "@apollo/client";
import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage";

export default function EmailPasswordForm({
    title = "Login!",
    buttonText = "Login!",
    loadingButtonText = "Please wait...",
    onSubmit,
    loading,
    error
}: {
    title?: string;
    buttonText?: string;
    loadingButtonText?: string;
    onSubmit: (email: string, password: string) => any;
    loading: boolean;
    error: ApolloError | undefined;
}) {
    const [{ email, password }, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, [e.target.name]: e.target.value };
        });
    };

    return (
        <>
            <h1>{title}</h1>
            <form action="none" onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    name="email"
                    value={email}
                    type="text"
                    placeholder="email"
                ></input>
                <input
                    onChange={handleChange}
                    value={password}
                    name="password"
                    type="password"
                ></input>
                <button disabled={loading}>
                    {loading ? loadingButtonText : buttonText}
                </button>
            </form>
            {error && <ErrorMessage error={error}></ErrorMessage>}
        </>
    );
}
