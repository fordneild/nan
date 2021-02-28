import React from "react";
import Header from "../../components/Header";
import styles from "./MainLayout.module.scss";
export default function MainLayout({ children }: { children: any }) {
    return (
        <div className={styles.mainLayout}>
            <Header />
            <div className={styles.mainContent}></div>
            {children}
        </div>
    );
}
