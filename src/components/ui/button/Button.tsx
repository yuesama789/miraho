import React from "react";
import styles from './Button.module.scss';

const Button: React.FC<{ onClick: () => void, type?: "primary" | "secondary" | "tertiary", centered?: boolean }> = ({ onClick, children, type = "primary", centered }) => {
    return (
        <button className={`${styles.customButton} ${styles[type]} ${centered ? styles.centered : ''}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
