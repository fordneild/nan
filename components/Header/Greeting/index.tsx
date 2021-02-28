import React from "react";
import useUsername from "./useUsername";
import styles from "./Greeting.module.scss";

export default function Username() {
    const { email, error, loading } = useUsername();
    return (
        <div className={styles.greeting}>
            {!loading && !error && email && <p>Hello {email}!</p>}
        </div>
    );
}
