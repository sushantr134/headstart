import React from "react";
import styles from './styles.module.scss';

export const Button = ({text, icon, linkTo, type, style,onClick,className}) => {
    return (
        <button type={type} onClick={onClick} className={`${className} ${styles.Button} ${styles.Primary}`}
                style={style}>
            {text}
            {typeof icon !== undefined && icon}
        </button>
    )
};