import React from "react";

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>404</h1>
            <div className={styles.wrapper}>
                <p className={styles.description}>This is not the web page you are looking for 😕</p>
            </div>
        </div>
    )
}

export default NotFoundBlock;