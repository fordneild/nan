import { ApolloError } from "@apollo/react-hooks";
import React from "react";

export default function ErrorMessage({ error }: { error: ApolloError }) {
    const { message } = error;
    const errorCode = error.graphQLErrors[0].extensions?.exception?.code;
    let uiMessage;
    switch (errorCode) {
        case "Neo.ClientError.Schema.ConstraintValidationFailed":
            uiMessage = parseMessageFromConstaintValidationFailed(message);
            break;
        default:
            uiMessage = message;
    }
    return <p style={{ color: "red" }}>{uiMessage}</p>;
}

const parseMessageFromConstaintValidationFailed = (message: string) => {
    const splitMessage = message.split(" ");
    let property;
    let label;
    for (let i = 0; i < splitMessage.length; i++) {
        if (splitMessage[i] === "label") {
            label = splitMessage[i + 1].replaceAll("`", "").toLowerCase();
        }
        if (splitMessage[i] === "property") {
            property = splitMessage[i + 1].replaceAll("`", "");
        }
    }
    return `That ${property} is already taken by another ${label}`;
};
