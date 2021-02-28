import { ApolloError } from "@apollo/client";
import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import capititalize from "../../lib/capitalize";

interface Input {
    name: string;
    type?: string;
    placeholder?: string;
}

export default function Form({
    header,
    buttonText = "Submit!",
    loadingButtonText = "Please wait...",
    inputs,
    onSubmit,
    loading,
    error
}: {
    header?: string;
    buttonText?: string;
    loadingButtonText?: string;
    inputs: Input[];
    onSubmit: (formData: any) => any;
    loading: boolean;
    error: ApolloError | undefined;
}) {
    const [formData, setFormData] = useState<any>({});
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData: any) => {
            return { ...prevFormData, [e.target.name]: e.target.value };
        });
    };

    return (
        <>
            <h1>{header}</h1>
            <form action="none" onSubmit={handleSubmit}>
                {inputs.map(({ name, type, placeholder }, index) => {
                    return (
                        <label htmlFor={name}>
                            <p>{capititalize(name)}:</p>
                            <input
                                key={index}
                                onChange={handleChange}
                                name={name}
                                value={formData[name] || ""}
                                type={type}
                                placeholder={placeholder}
                            ></input>
                        </label>
                    );
                })}
                <button disabled={loading}>
                    {loading ? loadingButtonText : buttonText}
                </button>
            </form>
            {error && <ErrorMessage error={error}></ErrorMessage>}
        </>
    );
}
