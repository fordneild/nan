import React from "react";
import styles from "./PostPreview.module.scss";
export default function PostPreview({
    title,
    text
}: {
    title: string;
    text: string;
}) {
    return (
        <div className={styles.postPreview}>
            {title && <h1>{title}</h1>}
            {text && <h4>{text}</h4>}
        </div>
    );
}
