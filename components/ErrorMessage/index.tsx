import { ApolloError } from "@apollo/react-hooks";
import React from "react";

export default function ErrorMessage({ error }: { error: ApolloError }) {
    const { message } = error;
    const errorCode = error.graphQLErrors[0]?.extensions?.exception?.code;
    let uiMessage;
    if (errorCode === "Neo.ClientError.Schema.ConstraintValidationFailed") {
        // email taken
        uiMessage = parseMessageFromConstaintValidationFailed(message);
    } else if (message === "Authorization Error") {
        //wrong username/password
        uiMessage = "Incorrect username/password combination";
    } else {
        console.log({ errorCode });
        console.log({ "uknown error": error });
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
