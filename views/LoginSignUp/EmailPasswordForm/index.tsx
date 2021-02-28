import { ApolloError } from "@apollo/client";
import React from "react";
import ErrorMessage from "../../../components/ErrorMessage";
import Form from "../../../components/Form";
import styles from "./EmailPasswordForm.module.scss";

const EMAIL_PASSWORD_INPUTS = [
    { name: "email" },
    { name: "password", type: "password" }
];
export default function EmailPasswordForm(props: any) {
    return (
        <div className={styles.emailPasswordForm}>
            <Form {...props} inputs={EMAIL_PASSWORD_INPUTS} />
        </div>
    );
}
// export default function EmailPasswordForm({
//     header = "Login!",
//     buttonText = "Login!",
//     loadingButtonText = "Please wait...",
//     onSubmit,
//     loading,
//     error
// }: {
//     header?: string;
//     buttonText?: string;
//     loadingButtonText?: string;
//     onSubmit: (formData: any) => void;
//     loading: boolean;
//     error: ApolloError | undefined;
// }) {
//     return (
//         <>
//             <Form
//                 header={header}
//                 inputs={EMAIL_PASSWORD_INPUTS}
//                 onSubmit={onSubmit}
//                 loadingButtonText={loadingButtonText}
//                 buttonText={buttonText}
//                 loading={loading}
//                 error={error}
//             />
//             {error && <ErrorMessage error={error}></ErrorMessage>}
//         </>
//     );
// }
