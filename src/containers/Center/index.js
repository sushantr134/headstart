import React from 'react';

import styles from './styles.module.scss';

export const CenterContainer = ({style, children}) => {
    return (
        <div className={styles.centerContainer} style={style}>
            {children}
        </div>
    )
};