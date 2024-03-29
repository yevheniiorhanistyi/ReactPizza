import React from "react";

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
    return (
        <div className="container" >
            <div className={styles.root}>
                <h1 className={styles.title}>404</h1>
                <div className={styles.wrapper}>
                    <p className={styles.description}>This is not the web page you are looking for 😕</p>
                </div>
            </div>
        </div>

    )
}