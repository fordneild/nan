import React from "react";
import Nav from "./Nav";
import styles from "./Header.module.scss";
import Greeting from "./Greeting";
export default function Header() {
    return (
        <header className={styles.header}>
            <Greeting />
            <Nav />
        </header>
    );
}
