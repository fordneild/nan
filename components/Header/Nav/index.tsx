import React from "react";
import Link from "next/link";
import Logout from "../../Logout";
import useAuth from "../../../hooks/useAuth";
import styles from "./Nav.module.scss";
export default function Nav() {
    const { isAuthenticated } = useAuth();

    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href={"/"}>
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/feed"}>
                        <a>Feed</a>
                    </Link>
                </li>
                {isAuthenticated && (
                    <li>
                        <Link href={"/create"}>
                            <a>Create</a>
                        </Link>
                    </li>
                )}
                <li>{isAuthenticated && <Logout />}</li>
            </ul>
        </nav>
    );
}
