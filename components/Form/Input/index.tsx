import React from "react";

export default function Input({
    key,
    handleChange,
    name,
    value,
    type = "text",
    placeholder
}: {
    key: number;
    handleChange: () => void;
    name: string;
    value: any;
    type?: string;
    placeholder?: string;
}) {
    return (
        <div>
            <label htmlFor={name}>
                <p>{capititalize(name)}:</p>
                <input
                    key={index}
                    onChange={handleChange}
                    name={name}
                    value={value}
                    type={type}
                    placeholder={placeholder}
                ></input>
            </label>
        </div>
    );
}
