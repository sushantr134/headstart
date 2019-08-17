import React from "react";

import styles from './styles.module.scss';

export const Card = ({header, body, footer}) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                {header}
            </div>
            <div className={styles.line}/>
            <div className={styles.cardBody}>
                {body}
            </div>
            <div className={styles.cardFooter}>
                {footer}
            </div>
        </div>
    )
};