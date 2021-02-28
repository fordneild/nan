import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { CREATE_POST } from "../../mutations";
import { GET_FEED } from "../../queries";
import refetchQueriesHelper from "../../lib/refetchQueriesHelper";
import Form from "../../components/Form";
import QueryResult from "../../hoc/QueryResult";
import styles from "./Create.module.scss";
const POST_INPUTS = [
    {
        name: "title"
    },
    {
        name: "text",
        type: "textarea"
    }
];
export default function CreatePost() {
    const [isPosted, setIsPosted] = useState<boolean>(false);
    const [post, { loading, error }] = useMutation(CREATE_POST, {
        onCompleted: () => {
            setIsPosted(true);
        }
    });
    const onSubmit = (formData: any) => {
        post({
            variables: formData,
            refetchQueries: refetchQueriesHelper([GET_FEED])
        });
    };
    return (
        <div className={styles.create}>
            <Form
                header={"Create a post!"}
                loading={loading}
                error={error}
                inputs={POST_INPUTS}
                onSubmit={onSubmit}
            />
            <QueryResult error={error} loading={loading}>
                {isPosted && <p>Your post was created!</p>}
            </QueryResult>
        </div>
    );
}
